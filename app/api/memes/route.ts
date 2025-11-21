import { NextResponse } from 'next/server';

const message = { error: 'Meme API disabled in this build.' };

export async function GET() {
  return NextResponse.json(message, { status: 503 });
}

export async function POST() {
  return NextResponse.json(message, { status: 503 });
}
