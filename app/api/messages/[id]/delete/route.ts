import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { ApiError } from '@/types/messages';

// Simple auth check - can be enhanced later
const MODERATION_SECRET = process.env.MODERATION_SECRET || 'change-me-in-production';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check for moderation secret in header
    const authHeader = request.headers.get('x-moderation-secret');
    if (authHeader !== MODERATION_SECRET) {
      const errorResponse: ApiError = {
        error: 'Unauthorized',
        code: 'UNAUTHORIZED',
      };
      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Soft delete the message
    const message = await prisma.message.update({
      where: { id },
      data: { deleted: true },
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Error deleting message:', error);
    const errorResponse: ApiError = {
      error: 'Failed to delete message',
      code: 'DELETE_ERROR',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

