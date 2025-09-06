import { z } from 'zod';

export const deleteUserSchema = z.object({
  id: z
    .string()
    .uuid()
    .refine((val) => !!val, { message: 'Invalid user ID format' }),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z
    .string()
    .regex(/^\+?\d{7,15}$/, 'Invalid phone number')
    .optional(),
  roleId: z.string().uuid('Invalid role ID format').optional(),
});