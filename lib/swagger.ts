import { createSwaggerSpec } from 'next-swagger-doc';

export const swaggerSpec = createSwaggerSpec({
  apiFolder: 'app/api',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prevalentware API',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger 🚀',
    },
    tags: [
      { name: 'Users', description: 'Gestión de usuarios' },
      { name: 'Movements', description: 'Movimientos financieros' },
      { name: 'Reports', description: 'Reportes y métricas' },
    ],
    paths: {
      '/api/users': {
        get: {
          tags: ['Users'],
          summary: 'Obtener lista de usuarios',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Lista de usuarios',
              content: {
                'application/json': {
                  example: [
                    {
                      id: 'usr_123',
                      name: 'Sebastian',
                      email: 'sebastian@example.com',
                      role: 'ADMIN',
                    },
                  ],
                },
              },
            },
          },
        },
        delete: {
          tags: ['Users'],
          summary: 'Eliminar usuario',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                example: { id: 'usr_123' },
              },
            },
          },
          responses: {
            204: { description: 'Usuario eliminado' },
            403: { description: 'Prohibido' },
          },
        },
      },
      '/api/movements': {
        get: {
          tags: ['Movements'],
          summary: 'Listar movimientos',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Lista de movimientos',
              content: {
                'application/json': {
                  example: [
                    {
                      id: 'mov_123',
                      concept: 'Pago servicio',
                      amount: 200,
                      type: 'EXPENSE',
                      date: '2024-09-01T12:00:00Z',
                    },
                  ],
                },
              },
            },
          },
        },
        post: {
          tags: ['Movements'],
          summary: 'Crear un movimiento',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                example: {
                  concept: 'Salario',
                  amount: 1000,
                  date: '2024-09-01',
                  type: 'INCOME',
                },
              },
            },
          },
          responses: {
            201: { description: 'Movimiento creado' },
            403: { description: 'Prohibido' },
          },
        },
      },
      '/api/reports': {
        get: {
          tags: ['Reports'],
          summary: 'Obtener métricas generales',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Datos de reportes',
              content: {
                'application/json': {
                  example: {
                    usersCount: 5,
                    totalIncome: 5000,
                    totalExpense: 3200,
                    balance: 1800,
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
});
