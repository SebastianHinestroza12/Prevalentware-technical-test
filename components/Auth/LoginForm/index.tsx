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

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await signIn(data.email, data.password);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success('¡Has iniciado sesión exitosamente!');
      router.push('/dashboard');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const data = await authClient.signIn.social({ provider: 'github' });

      if (data) toast.success('¡Has iniciado sesión con GitHub!');
    } catch (error) {
      const e = error as Error;
      toast.error(e.message || 'Error al iniciar sesión con GitHub');
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
              <div className='flex flex-col gap-4'>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={handleGithubSignIn}
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
                        className='text-sm underline-offset-4 hover:underline'
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='********'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type='submit'
                className='w-full'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
              </Button>

              {/* Register link */}
              <div className='text-center text-sm'>
                ¿No tienes una cuenta?{' '}
                <Link href='/register' className='underline underline-offset-4'>
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
