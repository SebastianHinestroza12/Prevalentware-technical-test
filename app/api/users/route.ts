import { prisma } from '@/lib/prisma';
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

export const DELETE = async (req: Request) => {
  const authCheck = await withAuth(req, ['users:delete']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ message: 'User ID is required' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return Response.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const authCheck = await withAuth(req, ['users:update']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const { id, ...data } = await req.json();

    if (!id) {
      return Response.json({ message: 'User ID is required' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return Response.json({ data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};