const { prisma } = await import('@/lib/prisma');

export const ensureMovementExists = async (id: string) => {
  const movement = await prisma.movement.findUnique({ where: { id } });
  if (!movement) {
    return {
      exists: false,
      response: Response.json(
        { message: 'Movement not found' },
        { status: 404 }
      ),
    };
  }
  return { exists: true, movement };
};
