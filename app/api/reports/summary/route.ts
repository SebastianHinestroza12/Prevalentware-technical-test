import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/authMiddleware';

export const GET = async (req: Request) => {
  const authCheck = await withAuth(req, ['reports:read']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    // Obtenemos datos en paralelo
    const [usersCount, totalIncomeAgg, totalExpenseAgg] = await Promise.all([
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

    const totalIncome = totalIncomeAgg._sum.amount || 0;
    const totalExpense = totalExpenseAgg._sum.amount || 0;
    const balance = totalIncome - totalExpense;

    return Response.json({
      data: {
        usersCount,
        totalIncome,
        totalExpense,
        balance,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
