jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    movement: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

// Mock global para autenticación (si usas NextAuth u otra estrategia)
jest.mock('@/lib/middleware/authMiddleware', () => ({
  withAuth: jest.fn((handler) => handler), // por defecto no valida nada
}))

// Resetear mocks entre tests
afterEach(() => {
  jest.clearAllMocks()
})
