'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password') as string;
  
  if (password === process.env.ADMIN_DASHBOARD_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return { success: true };
  }
  
  return { error: 'Invalid password' };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin');
}
