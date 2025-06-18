import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = "firebase_session_token"

export const setSessionCookie = async (token: string) => {
  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 5,
  })
}

export const getSessionCookie = async () => {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)
  return cookie?.value
}

export const clearSessionCookie = async () => {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}
