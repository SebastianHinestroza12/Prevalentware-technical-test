import { swaggerSpec } from '@/lib/swagger';

export async function GET() {
  return Response.json(swaggerSpec);
}
