'use client';

import { useState } from 'react';
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
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { signIn } from '@/server/user';
import { LoginFormInputs, loginSchema } from '@/lib/validation/authSchema';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/client';
import { Github, Eye, EyeOff } from 'lucide-react';

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await signIn(data.email, data.password);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success('¡Sesión iniciada con éxito!');
      router.push('/home');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsGithubLoading(true);
      const data = await authClient.signIn.social({
        provider: 'github',
        callbackURL: `${window.location.origin}/home`,
      });

      if (data) toast.success('¡Has iniciado sesión con GitHub!');
    } catch (error) {
      const e = error as Error;
      toast.error(e.message || 'Error al iniciar sesión con GitHub');
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl font-bold text-emerald-600'>
            Accede a tu cuenta
          </CardTitle>
          <CardDescription>
            Gestiona tus ingresos, egresos y costos en un solo lugar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
              {/* GitHub login */}
              <div className='flex flex-col gap-4'>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full flex items-center gap-2'
                  onClick={handleGithubSignIn}
                  disabled={isGithubLoading}
                >
                  {isGithubLoading ? (
                    <span className='animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4' />
                  ) : (
                    <Github className='w-4 h-4' />
                  )}
                  {isGithubLoading ? 'Conectando...' : 'Continuar con GitHub'}
                </Button>
              </div>

              <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                  O inicia con tu correo electrónico
                </span>
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Correo electrónico <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='correo@ejemplo.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              {/* Password */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>
                        Contraseña <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Link
                        href='#'
                        className='text-sm text-emerald-600 hover:underline'
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='********'
                          {...field}
                        />
                        <button
                          type='button'
                          className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-emerald-600'
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOff className='w-5 h-5' />
                          ) : (
                            <Eye className='w-5 h-5' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type='submit'
                className='w-full bg-emerald-600 hover:bg-emerald-700 text-white'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
              </Button>

              {/* Register link */}
              <div className='text-center text-sm'>
                ¿No tienes una cuenta?{' '}
                <Link
                  href='/register'
                  className='text-emerald-600 hover:underline'
                >
                  Regístrate
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
