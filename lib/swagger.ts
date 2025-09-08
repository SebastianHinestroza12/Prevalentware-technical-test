import { createSwaggerSpec } from 'next-swagger-doc';

export const swaggerSpec = createSwaggerSpec({
  apiFolder: 'app/api',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finanza Ya API',
      version: '1.0.0',
      description: '📊 API REST de Finanza Ya documentada con Swagger 🚀',
    },
    tags: [
      { name: 'Health', description: 'Estado de la API y la base de datos' },
      { name: 'Users', description: 'Gestión de usuarios' },
      { name: 'Movements', description: 'Gestión de movimientos financieros' },
      { name: 'Reports', description: 'Reportes financieros y exportaciones' },
    ],
    paths: {
      // Health check
      '/api/health': {
        get: {
          tags: ['Health'],
          summary: 'Verificar el estado de la API y la base de datos',
          responses: {
            200: {
              description: 'API funcionando correctamente',
              content: {
                'application/json': {
                  example: {
                    status: 'Ok',
                    message: 'API running smoothly 🚀',
                    timestamp: '2024-09-01T12:00:00Z',
                  },
                },
              },
            },
            500: {
              description: 'Error de conexión a la base de datos',
            },
          },
        },
      },

      // Users
      '/api/users': {
        get: {
          tags: ['Users'],
          summary: 'Obtener todos los usuarios',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Lista de usuarios',
              content: {
                'application/json': {
                  example: {
                    data: [
                      {
                        id: 'usr_123',
                        name: 'Sebastian',
                        email: 'sebastian@example.com',
                        role: { id: 1, name: 'ADMIN' },
                        movements: [],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      '/api/users/{id}': {
        get: {
          tags: ['Users'],
          summary: 'Obtener un usuario por ID',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: {
              description: 'Usuario encontrado',
            },
            404: {
              description: 'Usuario no encontrado',
            },
          },
        },
        put: {
          tags: ['Users'],
          summary: 'Actualizar un usuario',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                example: {
                  name: 'Sebastian',
                  email: 'sebastian@example.com',
                  roleId: 1,
                },
              },
            },
          },
          responses: {
            200: { description: 'Usuario actualizado correctamente' },
            400: { description: 'Error de validación' },
            404: { description: 'Usuario no encontrado' },
          },
        },
      },

      // Movements
      '/api/movements': {
        get: {
          tags: ['Movements'],
          summary: 'Listar movimientos de un usuario',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'userId',
              in: 'query',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: {
              description: 'Lista de movimientos',
              content: {
                'application/json': {
                  example: {
                    data: [
                      {
                        id: 'mov_123',
                        concept: 'Pago servicio',
                        amount: 200,
                        type: 'EXPENSE',
                        date: '2024-09-01T12:00:00Z',
                        userId: 'usr_123',
                      },
                    ],
                  },
                },
              },
            },
            400: { description: 'User ID es requerido' },
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
                  userId: 'usr_123',
                },
              },
            },
          },
          responses: {
            201: { description: 'Movimiento creado' },
            400: { description: 'Error de validación' },
            404: { description: 'Usuario no encontrado' },
          },
        },
        put: {
          tags: ['Movements'],
          summary: 'Actualizar un movimiento',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                example: {
                  id: 'mov_123',
                  concept: 'Pago editado',
                  amount: 250,
                  date: '2024-09-02',
                  type: 'EXPENSE',
                },
              },
            },
          },
          responses: {
            200: { description: 'Movimiento actualizado' },
            404: { description: 'Movimiento no encontrado' },
          },
        },
        delete: {
          tags: ['Movements'],
          summary: 'Eliminar un movimiento',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                example: { id: 'mov_123' },
              },
            },
          },
          responses: {
            204: { description: 'Movimiento eliminado' },
            404: { description: 'Movimiento no encontrado' },
          },
        },
      },

      // Reports
      '/api/reports/export': {
        get: {
          tags: ['Reports'],
          summary: 'Exportar todos los movimientos en formato CSV',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Archivo CSV generado',
              content: {
                'text/csv': {
                  example: `ID,Concept,Amount,Date,Type,User Email\nmov_123,Pago servicio,200,2024-09-01,EXPENSE,user@example.com`,
                },
              },
            },
          },
        },
      },
      '/api/reports/summary': {
        get: {
          tags: ['Reports'],
          summary: 'Obtener métricas generales',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Resumen de ingresos, egresos y balance',
              content: {
                'application/json': {
                  example: {
                    data: {
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
