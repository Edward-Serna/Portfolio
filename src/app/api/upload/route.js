import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const form = await request.formData();
  const file = form.get('file');
  const blob = await put(file.name, file, { access: 'private' });

  return NextResponse.json(blob);
}