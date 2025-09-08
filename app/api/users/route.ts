const { prisma } = await import('@/lib/prisma');
import { withAuth } from '@/lib/middleware/authMiddleware';

export const GET = async (req: Request) => {
  const authCheck = await withAuth(req, ['users:read']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const users = await prisma.user.findMany({
      include: { movements: true, role: true },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json({ data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
