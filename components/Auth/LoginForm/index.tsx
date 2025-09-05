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
import { useState } from 'react';
import { signIn } from '@/server/user';

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn(email, password);

    if (!result.success) {
      setError(result.message);
    } else {
      window.location.href = '/dashboard';
    }

    setLoading(false);
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
          <form onSubmit={handleSubmit}>
            <div className='grid gap-6'>
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

              <div className='grid gap-6'>
                {error && <p className='text-red-500 text-sm'>{error}</p>}

                <div className='grid gap-2'>
                  <Label htmlFor='email'>Correo electrónico</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='correo@ejemplo.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Contraseña</Label>
                    <Link
                      href='#'
                      className='ml-auto text-sm underline-offset-4 hover:underline'
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? 'Cargando...' : 'Iniciar sesión'}
                </Button>
              </div>

              <div className='text-center text-sm'>
                ¿No tienes una cuenta?{' '}
                <Link href='/register' className='underline underline-offset-4'>
                  Regístrate
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
