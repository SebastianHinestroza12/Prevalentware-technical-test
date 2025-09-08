import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Correo es requerido')
  .email('Correo no válido');

export const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
  .regex(/\d/, 'La contraseña debe contener al menos un número')
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    'La contraseña debe contener al menos un carácter especial'
  );

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, 'Nombre es requerido'),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;
