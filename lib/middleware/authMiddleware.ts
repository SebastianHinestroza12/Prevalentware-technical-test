import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
const { prisma } = await import('@/lib/prisma');

export async function withAuth(
  req: Request,
  requiredPermissions: string[] = []
) {
  const reqHeaders = await headers();

  // Validar API Key en los headers
  const apiKey = reqHeaders.get('x-api-key');
  if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return {
      authorized: false,
      response: Response.json({ message: 'Invalid API Key' }, { status: 401 }),
    };
  }

  // Validar sesión
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session) {
    return {
      authorized: false,
      response: Response.json({ message: 'Unauthorized' }, { status: 401 }),
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      role: {
        include: {
          permissions: {
            include: { permission: true },
          },
        },
      },
    },
  });

  if (!user || !user.role) {
    return {
      authorized: false,
      response: Response.json(
        {
          message:
            'You do not have permission to access this resource. Forbidden.',
        },
        { status: 403 }
      ),
    };
  }

  // Extraer permisos del usuario
  const userPermissions = user.role.permissions.map((rp) => rp.permission.name);

  // Verificar permisos requeridos
  const hasPermission = requiredPermissions.every((perm) =>
    userPermissions.includes(perm)
  );

  if (!hasPermission) {
    return {
      authorized: false,
      response: Response.json({ message: 'Forbidden' }, { status: 403 }),
    };
  }

  return {
    authorized: true,
    user,
  };
}
