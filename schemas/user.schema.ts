import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z
    .string()
    .regex(/^\+?\d{7,15}$/, 'Invalid phone number')
    .optional(),
  roleId: z.string().min(1, 'Invalid role ID format').optional(),
});

export const editUserSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  roleId: z.string().min(1, 'El rol es requerido'),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;
