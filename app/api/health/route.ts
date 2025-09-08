const { prisma } = await import('@/lib/prisma');

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return Response.json({
      status: 'Ok',
      message: 'API running smoothly 🚀',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Health check failed:', error);

    // Información adicional para debug
    const debugInfo = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      prismaUrl: process.env.DATABASE_URL?.replace(/:.+@/, ':****@'), // oculta la contraseña
    };

    console.log('Debug info:', debugInfo);

    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Database connection failed ❌',
        timestamp: new Date().toISOString(),
        error: debugInfo,
      }),
      { status: 500 }
    );
  }
}
