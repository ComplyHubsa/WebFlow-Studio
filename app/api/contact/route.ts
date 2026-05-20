import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwVcdMfRGO7TDeVBbXcTNxklno34B3UMoxAO6RACp_jzCpMDAMlhtVfyxnQf0EuHVI/exec'

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    // Google Script returns opaque responses — errors are expected and safe to swallow
  }

  return NextResponse.json({ ok: true })
}
