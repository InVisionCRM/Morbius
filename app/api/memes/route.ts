import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import type { Meme as PrismaMeme } from '@prisma/client';
import type { CreateMemeRequest, CreateMemeResponse, Meme } from '@/types/memes';

const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const DEFAULT_LIMIT = 50;

function jsonResponse<T>(data: T, init?: number) {
  return NextResponse.json(data, init ? { status: init } : undefined);
}

export async function GET(req: NextRequest) {
  try {
    const limitParam = req.nextUrl.searchParams.get('limit');
    const limit = limitParam ? Math.min(parseInt(limitParam, 10) || DEFAULT_LIMIT, 100) : DEFAULT_LIMIT;

    const memes = await prisma.meme.findMany({
      orderBy: { created_at: 'desc' },
      take: limit,
    });

    const response: { memes: Meme[] } = {
      memes: memes.map((meme: PrismaMeme) => ({
        ...meme,
        created_at: meme.created_at.toISOString(),
      })),
    };

    return jsonResponse(response);
  } catch (error) {
    console.error('Failed to fetch memes', error);
    return jsonResponse({ error: 'Failed to fetch memes' }, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return jsonResponse({ error: 'Blob storage token missing' }, 500);
    }

    const body: CreateMemeRequest = await req.json();
    if (!body?.imageData) {
      return jsonResponse({ error: 'imageData is required' }, 400);
    }

    const matches = body.imageData.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      return jsonResponse({ error: 'Invalid image data' }, 400);
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
      return jsonResponse({ error: 'Image is too large' }, 400);
    }

    const fileExtension = contentType.split('/')[1] || 'png';
    const blobPath = `memes/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExtension}`;

    const blob = await put(blobPath, buffer, {
      access: 'public',
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const title = body.title?.trim() || null;
    const creatorName = body.creatorName?.trim() || null;

    const meme = await prisma.meme.create({
      data: {
        image_url: blob.url,
        title,
        creator_name: creatorName,
      },
    });

    const response: CreateMemeResponse = {
      meme: {
        ...meme,
        created_at: meme.created_at.toISOString(),
      },
    };

    return jsonResponse(response, 201);
  } catch (error) {
    console.error('Failed to create meme', error);
    return jsonResponse({ error: 'Failed to create meme' }, 500);
  }
}
