import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/authMiddleware';

export const GET = async (req: Request) => {
  const authCheck = await withAuth(req, ['reports:export']);
  if (!authCheck.authorized) return authCheck.response;

  try {
    const movements = await prisma.movement.findMany({
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
      orderBy: { date: 'desc' },
    });

    // Construir el CSV
    const headers = ['ID', 'Concept', 'Amount', 'Date', 'Type', 'User Email'];
    const rows = movements.map((m) => [
      m.id,
      m.concept,
      m.amount.toString(),
      m.date.toISOString(),
      m.type,
      m.user?.email || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="report.csv"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
