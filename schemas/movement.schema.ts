import { z } from 'zod';

export const createMovementSchema = z.object({
  amount: z.number().positive('El monto debe ser mayor a 0'),
  concept: z.string().min(1, 'El concepto es obligatorio'),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: 'La fecha no es válida',
  }),
  userId: z.string().min(10, 'El usuario no es válido'),
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
});

export type MovementFormData = z.infer<typeof createMovementSchema>;

export const updateMovementSchema = z.object({
  id: z.string().min(10),
  amount: z.number().positive('El monto debe ser mayor a 0').optional(),
  concept: z.string().min(1, 'El concepto es obligatorio').optional(),
  date: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), {
      message: 'La fecha no es válida',
    })
    .optional(),
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
});

export const deleteMovementSchema = z.object({
  id: z.string().min(10),
});
