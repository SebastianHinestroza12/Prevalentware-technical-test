const { prisma } = await import('@/lib/prisma');
import { withAuth } from '@/lib/middleware/authMiddleware';
import {
  createMovementSchema,
  updateMovementSchema,
  deleteMovementSchema,
} from '@/schemas/movement.schema';
import { validateSchema } from '@/lib/validateSchema';
import { ensureMovementExists } from '@/utils/movementUtils';

export const GET = async (req: Request) => {
  const authCheck = await withAuth(req, ['movements:read']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json({ message: 'User ID is required' }, { status: 400 });
    }

    const movements = await prisma.movement.findMany({
      where: { userId },
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    return Response.json({ data: movements });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const authCheck = await withAuth(req, ['movements:create']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const body = await req.json();
    const validation = validateSchema(createMovementSchema, body);

    if (!validation.success) {
      return Response.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const { amount, concept, date, userId, type } = validation.data;

    const newMovement = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error('UserNotFound');
      }

      return await tx.movement.create({
        data: {
          amount,
          concept,
          date: new Date(date),
          type: type as 'INCOME' | 'EXPENSE',
          user: { connect: { id: userId } },
        },
      });
    });

    return Response.json({ data: newMovement }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UserNotFound') {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }
    console.error(error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const authCheck = await withAuth(req, ['movements:update']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const body = await req.json();
    const validation = validateSchema(updateMovementSchema, body);

    if (!validation.success) {
      return Response.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const { id, ...data } = validation.data;

    const { exists, response } = await ensureMovementExists(id);
    if (!exists) return response;

    const updatedMovement = await prisma.$transaction(
      async (tx) =>
        await tx.movement.update({
          where: { id },
          data: { ...data, date: data.date ? new Date(data.date) : undefined },
        })
    );

    return Response.json({ data: updatedMovement });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const authCheck = await withAuth(req, ['movements:delete']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const body = await req.json();
    const validation = validateSchema(deleteMovementSchema, body);

    if (!validation.success) {
      return Response.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const { exists, response } = await ensureMovementExists(validation.data.id);
    if (!exists) return response;

    await prisma.$transaction(async (tx) => {
      await tx.movement.delete({ where: { id: validation.data.id } });
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
