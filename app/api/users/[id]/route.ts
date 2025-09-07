import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/authMiddleware';
import { validateSchema } from '@/lib/validateSchema';
import { updateUserSchema } from '@/schemas/user.schema';

type RouteParams = {
  params: { id: string };
};

export const GET = async (req: Request, { params }: RouteParams) => {
  const authCheck = await withAuth(req, ['users:read']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const { id } = params;

    if (!id) {
      return Response.json({ message: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    return Response.json({ data: user });
  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const authCheck = await withAuth(req, ['users:update']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const id = params.id;

    if (!id) {
      return Response.json({ message: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    let body;

    try {
      body = await req.json();
    } catch {
      return Response.json(
        { message: 'Request body is required' },
        { status: 400 }
      );
    }

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

