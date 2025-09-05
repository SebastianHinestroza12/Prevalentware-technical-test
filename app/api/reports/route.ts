import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const GET = auth(async (req, ctx) => {
  if (!ctx.session) return new Response('Unauthorized', { status: 401 });
  if (ctx.session.user.role !== 'ADMIN') {
    return new Response('Forbidden', { status: 403 });
  }

  const [usersCount, totalIncome, totalExpense] = await Promise.all([
    prisma.user.count(),
    prisma.movement.aggregate({
      _sum: { amount: true },
      where: { type: 'INCOME' },
    }),
    prisma.movement.aggregate({
      _sum: { amount: true },
      where: { type: 'EXPENSE' },
    }),
  ]);

  return Response.json({
    usersCount,
    totalIncome: totalIncome._sum.amount || 0,
    totalExpense: totalExpense._sum.amount || 0,
    balance: (totalIncome._sum.amount || 0) - (totalExpense._sum.amount || 0),
  });
});
