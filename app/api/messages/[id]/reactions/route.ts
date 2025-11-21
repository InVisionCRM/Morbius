export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { buildReactionCounts, REACTION_TYPES } from '@/lib/reactions';
import type { ReactionRequest, ReactionResponse, ApiError, ReactionType } from '@/types/messages';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: ReactionRequest = await request.json();
    const reactionType = body?.reaction;

    if (!reactionType || !isValidReaction(reactionType)) {
      const errorResponse: ApiError = {
        error: 'Invalid reaction type',
        code: 'VALIDATION_ERROR',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const message = await prisma.message.findFirst({
      where: { id, deleted: false },
      select: { id: true },
    });

    if (!message) {
      const errorResponse: ApiError = {
        error: 'Message not found',
        code: 'NOT_FOUND',
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    try {
      await prisma.reaction.update({
        where: {
          message_id_reaction_type: {
            message_id: id,
            reaction_type: reactionType,
          },
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        await prisma.reaction.create({
          data: {
            message_id: id,
            reaction_type: reactionType,
            count: 1,
          },
        });
      } else {
        throw error;
      }
    }

    const reactions = await prisma.reaction.findMany({
      where: { message_id: id },
      select: {
        reaction_type: true,
        count: true,
      },
    });

    const response: ReactionResponse = {
      messageId: id,
      reactions: buildReactionCounts(reactions),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating reaction:', error);
    const errorResponse: ApiError = {
      error: 'Failed to update reaction',
      code: 'REACTION_ERROR',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

function isValidReaction(reaction: ReactionType): boolean {
  return REACTION_TYPES.includes(reaction);
}
