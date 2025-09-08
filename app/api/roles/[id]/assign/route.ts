const { prisma } = await import('@/lib/prisma');

/**
 * POST => asegurar que el usuario tenga rol (si no, asigna ADMIN)
 */
export async function POST(req: Request, context: any) {
  try {
    const { id } = context.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    if (!user.roleId) {
      const defaultRole = await prisma.role.findFirst({
        where: { name: 'ADMIN' },
      });

      if (defaultRole) {
        await prisma.user.update({
          where: { id },
          data: { role: { connect: { id: defaultRole.id } } },
        });
      }
    }

    return Response.json({ message: 'Role verified' });
  } catch (error) {
    console.error('Error ensuring user role:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
