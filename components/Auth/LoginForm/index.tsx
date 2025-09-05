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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { signIn } from '@/server/user';
import { LoginFormInputs, loginSchema } from '@/lib/validation/authSchema';

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await signIn(data.email, data.password);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success('¡Has iniciado sesión exitosamente!');
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Bienvenido de nuevo</CardTitle>
          <CardDescription>
            Inicia sesión con tu cuenta de GitHub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
            <div className='flex flex-col gap-4'>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => (window.location.href = '/api/auth/github')}
              >
                Iniciar con GitHub
              </Button>
            </div>

            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
              <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                O continuar con correo electrónico
              </span>
            </div>

            {/* Email */}
            <div className='grid gap-2'>
              <Label htmlFor='email'>
                Correo electrónico <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='correo@ejemplo.com'
                {...register('email')}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>
                  Contraseña <span className='text-red-500'>*</span>
                </Label>
                <Link
                  href='#'
                  className='ml-auto text-sm underline-offset-4 hover:underline'
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id='password' type='password' {...register('password')} />
              {errors.password && (
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
            </Button>

            {/* Register link */}
            <div className='text-center text-sm'>
              ¿No tienes una cuenta?{' '}
              <Link href='/register' className='underline underline-offset-4'>
                Regístrate
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
