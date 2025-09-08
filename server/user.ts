'use server';

const { prisma } = await import('@/lib/prisma');
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      role: {
        include: {
          permissions: { include: { permission: true } },
        },
      },
    },
  });

  if (!currentUser) {
    redirect('/login');
  }

  // Extraer permisos en un array de strings
  const permissions =
    currentUser.role?.permissions.map((rp) => rp.permission.name) || [];

  return {
    ...session,
    currentUser,
    permissions,
  };
};

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true, message: 'Signed in successfully.' };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || 'An unknown error occurred.',
    };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const newUser = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        role: { connect: { name: 'ADMIN' } } as unknown as string,
      },
    });

    return {
      success: true,
      message: 'Usuario registrado exitosamente.',
      data: newUser,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || 'Ocurrió un error desconocido.',
    };
  }
};
