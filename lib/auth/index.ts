import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
const { prisma } = await import('@/lib/prisma');
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: { type: 'string' },
    },
  },
  session: {
    // 1 día en segundos
    expiresIn: 60 * 60 * 24,
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
