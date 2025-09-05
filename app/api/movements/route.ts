import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/authMiddleware';

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
      orderBy: { createdAt: 'desc' },
    });

    return Response.json({ data: movements });
  } catch (error) {
    console.error('Error fetching movements:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const authCheck = await withAuth(req, ['movements:create']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const { amount, concept, date, userId, type } = await req.json();

    if (!amount || !concept || !date || !userId || !type) {
      return Response.json(
        { message: 'amount, concept, date, userId and type are required' },
        { status: 400 }
      );
    }

    const newMovement = await prisma.movement.create({
      data: {
        amount,
        concept,
        date: new Date(date),
        type,
        user: {
          connect: { id: userId }
        }
      },
    });

    return Response.json({ data: newMovement }, { status: 201 });
  } catch (error) {
    console.error('Error creating movement:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const authCheck = await withAuth(req, ['movements:update']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const { id, ...data } = await req.json();

    if (!id) {
      return Response.json(
        { message: 'Movement ID is required' },
        { status: 400 }
      );
    }

    const updatedMovement = await prisma.movement.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });

    return Response.json({ data: updatedMovement });
  } catch (error) {
    console.error('Error updating movement:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const authCheck = await withAuth(req, ['movements:delete']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { message: 'Movement ID is required' },
        { status: 400 }
      );
    }

    await prisma.movement.delete({
      where: { id },
    });

    return Response.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting movement:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
