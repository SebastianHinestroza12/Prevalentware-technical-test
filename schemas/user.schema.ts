import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z
    .string()
    .regex(/^\+?\d{7,15}$/, 'Invalid phone number')
    .optional(),
  roleId: z.string().min(1, 'Invalid role ID format').optional(),
});