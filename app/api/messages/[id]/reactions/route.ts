export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
const disabled = { error: 'Reactions disabled' };

export async function POST() {
  return NextResponse.json(disabled, { status: 503 });
}
