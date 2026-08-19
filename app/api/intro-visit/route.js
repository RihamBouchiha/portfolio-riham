import { NextResponse } from 'next/server';

const INTRO_COOKIE = 'riham_intro_seen';
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function GET(request) {
  const hasSeenIntro = request.cookies.get(INTRO_COOKIE)?.value === '1';
  const response = NextResponse.json({ showIntro: !hasSeenIntro });

  if (!hasSeenIntro) {
    response.cookies.set({
      name: INTRO_COOKIE,
      value: '1',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: ONE_YEAR,
    });
  }

  return response;
}
