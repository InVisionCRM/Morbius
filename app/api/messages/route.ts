export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashIP, getClientIP } from '@/lib/ip-hash';
import { containsProfanity } from '@/lib/profanity';
import { checkRateLimit, recordPost } from '@/lib/rate-limit';
import { buildReactionCounts } from '@/lib/reactions';
import type {
  GetMessagesResponse,
  PostMessageRequest,
  PostMessageResponse,
  ApiError,
  ReactionType,
} from '@/types/messages';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;
const MAX_CONTENT_LENGTH = 500;
const MAX_USERNAME_LENGTH = 25;

type ReactionRecord = {
  reaction_type: ReactionType;
  count: number;
};

type MessageRecord = {
  id: string;
  content: string;
  created_at: Date;
  ip_hash: string | null;
  deleted: boolean;
  user_name: string | null;
  parent_id: string | null;
  reactions: ReactionRecord[];
  replies: {
    id: string;
    content: string;
    created_at: Date;
    ip_hash: string | null;
    deleted: boolean;
    user_name: string | null;
    parent_id: string | null;
    reactions: ReactionRecord[];
  }[];
};

const messageSelect = {
  id: true,
  content: true,
  created_at: true,
  ip_hash: true,
  deleted: true,
  user_name: true,
  parent_id: true,
  reactions: {
    select: {
      reaction_type: true,
      count: true,
    },
  },
  replies: {
    where: {
      deleted: false,
    },
    orderBy: {
      created_at: 'asc' as const,
    },
    select: {
      id: true,
      content: true,
      created_at: true,
      ip_hash: true,
      deleted: true,
      user_name: true,
      parent_id: true,
      reactions: {
        select: {
          reaction_type: true,
          count: true,
        },
      },
    },
  },
};

function serializeMessage(raw: MessageRecord) {
  return {
    id: raw.id,
    content: raw.content,
    created_at: raw.created_at,
    ip_hash: raw.ip_hash,
    deleted: raw.deleted,
    user_name: raw.user_name,
    parent_id: raw.parent_id,
    reactions: buildReactionCounts(raw.reactions ?? []),
    replies: (raw.replies ?? []).map((reply) => ({
      id: reply.id,
      content: reply.content,
      created_at: reply.created_at,
      ip_hash: reply.ip_hash,
      deleted: reply.deleted,
      user_name: reply.user_name,
      parent_id: reply.parent_id,
      reactions: buildReactionCounts(reply.reactions ?? []),
      replies: [],
    })),
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(
      parseInt(searchParams.get('limit') || String(DEFAULT_LIMIT), 10),
      MAX_LIMIT
    );
    const before = searchParams.get('before');

    const where = {
      deleted: false,
      parent_id: null,
      ...(before && {
        id: {
          lt: before,
        },
      }),
    };

    const messages = await prisma.message.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      },
      take: limit + 1, // Fetch one extra to check if there are more
      select: messageSelect,
    });

    const hasMore = messages.length > limit;
    const result = (hasMore ? messages.slice(0, limit) : messages).map(serializeMessage);
    const nextCursor =
      hasMore && messages.length > 0 ? messages[limit - 1]?.id ?? messages[messages.length - 1].id : undefined;

    const response: GetMessagesResponse = {
      messages: result,
      hasMore,
      ...(nextCursor && { nextCursor }),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching messages:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorResponse: ApiError = {
      error: `Failed to fetch messages: ${errorMessage}`,
      code: 'FETCH_ERROR',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PostMessageRequest = await request.json();
    const { content, username, parentId } = body;

    // Validation
    if (!content || typeof content !== 'string') {
      const errorResponse: ApiError = {
        error: 'Content is required',
        code: 'VALIDATION_ERROR',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const trimmedContent = content.trim();
    if (trimmedContent.length === 0) {
      const errorResponse: ApiError = {
        error: 'Content cannot be empty',
        code: 'VALIDATION_ERROR',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const normalizedUsername = typeof username === 'string' ? username.trim() : '';
    const trimmedUsername = normalizedUsername.length > 0 ? normalizedUsername : null;

    if (trimmedUsername && trimmedUsername.length > MAX_USERNAME_LENGTH) {
      const errorResponse: ApiError = {
        error: `Username must be ${MAX_USERNAME_LENGTH} characters or less`,
        code: 'VALIDATION_ERROR',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (trimmedContent.length > MAX_CONTENT_LENGTH) {
      const errorResponse: ApiError = {
        error: `Content must be ${MAX_CONTENT_LENGTH} characters or less`,
        code: 'VALIDATION_ERROR',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (parentId) {
      const parentExists = await prisma.message.findFirst({
        where: { id: parentId, deleted: false },
        select: { id: true },
      });

      if (!parentExists) {
        const errorResponse: ApiError = {
          error: 'Parent message not found',
          code: 'PARENT_NOT_FOUND',
        };
        return NextResponse.json(errorResponse, { status: 404 });
      }
    }

    // Profanity check
    if (containsProfanity(trimmedContent)) {
      const errorResponse: ApiError = {
        error: 'Content contains inappropriate language',
        code: 'PROFANITY_ERROR',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const ipHash = hashIP(clientIP);

    const withinRateLimit = await checkRateLimit(ipHash);
    if (!withinRateLimit) {
      const errorResponse: ApiError = {
        error: 'Rate limit exceeded. Please wait before posting again.',
        code: 'RATE_LIMIT_ERROR',
      };
      return NextResponse.json(errorResponse, { status: 429 });
    }

    // Create message
    const messageRecord = await prisma.message.create({
      data: {
        content: trimmedContent,
        ip_hash: ipHash,
        user_name: trimmedUsername,
        parent_id: parentId || null,
      },
      select: messageSelect,
    });

    // Record the post for rate limiting
    await recordPost(ipHash);

    const response: PostMessageResponse = {
      message: serializeMessage(messageRecord),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    const errorResponse: ApiError = {
      error: 'Failed to create message',
      code: 'CREATE_ERROR',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
