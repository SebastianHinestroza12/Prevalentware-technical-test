const { prisma } = await import('@/lib/prisma');

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return Response.json({
      status: 'Ok',
      message: 'API running smoothly 🚀',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Database connection failed ❌',
        timestamp: new Date().toISOString(),
      }),
      { status: 500 }
    );
  }
}
