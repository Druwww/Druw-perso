'use server';

import { LOGIN_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from '@/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export async function createSession(uid: string) {
  cookies().set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // One day
    path: '/',
  });

  redirect(ROOT_ROUTE);
}

export async function removeSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}

export async function checkSession(){
    const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
    if (!session) {
        redirect(LOGIN_ROUTE);
    }
}