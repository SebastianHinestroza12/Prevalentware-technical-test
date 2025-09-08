import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
const { prisma } = await import('@/lib/prisma');
import { nextCookies } from 'better-auth/next-js';

const githubClientId =
  process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CLIENT_ID_PROD
    : process.env.GITHUB_CLIENT_ID;

const githubClientSecret =
  process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CLIENT_SECRET_PROD
    : process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: githubClientId as string,
      clientSecret: githubClientSecret as string,
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
