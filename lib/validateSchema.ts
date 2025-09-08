import { ZodSchema } from 'zod';

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };

export function validateSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const { fieldErrors } = result.error.flatten();

    const normalizedErrors: Record<string, string[]> = {};
    for (const key in fieldErrors) {
      normalizedErrors[key] = fieldErrors[key] ?? [];
    }

    return { success: false, errors: normalizedErrors };
  }

  return { success: true, data: result.data };
}
