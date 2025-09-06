import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/authMiddleware';
import { validateSchema } from '@/lib/validateSchema';
import { updateUserSchema } from '@/schemas/user.schema';

type RouteParams = {
  params: { id: string };
};

export const DELETE = async (req: Request, { params }: RouteParams) => {
  const authCheck = await withAuth(req, ['users:delete']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const { id } = params;

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

export const PUT = async (req: Request, { params }: RouteParams) => {
  const authCheck = await withAuth(req, ['users:update']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const { id } = params;

    if (!id) {
      return Response.json({ message: 'User ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const validation = validateSchema(updateUserSchema, body);

    if (!validation.success) {
      return Response.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const { roleId, ...rest } = validation.data ?? {};

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...rest,
        ...(roleId ? { role: { connect: { id: Number(roleId) } } } : {}),
      },
    });

    return Response.json({ data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
