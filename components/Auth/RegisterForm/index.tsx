'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signUp } from '@/server/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  registerSchema,
  RegisterFormInputs,
} from '@/lib/validation/authSchema';

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const result = await signUp(data.email, data.password, data.name);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success('Usuario registrado exitosamente');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Crear cuenta</CardTitle>
          <CardDescription>
            Regístrate con tu correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>
                Nombre <span className='text-red-500'>*</span>
              </Label>
              <Input id='name' type='text' {...register('name')} />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='email'>
                Correo electrónico <span className='text-red-500'>*</span>
              </Label>
              <Input id='email' type='email' {...register('email')} />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='password'>
                Contraseña <span className='text-red-500'>*</span>
              </Label>
              <Input id='password' type='password' {...register('password')} />
              {errors.password && (
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Cargando...' : 'Registrarse'}
            </Button>

            <div className='text-center text-sm'>
              ¿Ya tienes una cuenta?{' '}
              <Link href='/login' className='underline underline-offset-4'>
                Inicia sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
