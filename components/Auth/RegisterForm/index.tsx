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
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signUp } from '@/server/user';

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signUp(email, password, name);

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
          <CardTitle className='text-xl'>Crear cuenta</CardTitle>
          <CardDescription>
            Regístrate con tu correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-6'>
              {error && <p className='text-red-500 text-sm'>{error}</p>}

              <div className='grid gap-2'>
                <Label htmlFor='name'>Nombre</Label>
                <Input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>Correo electrónico</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='password'>Contraseña</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? 'Cargando...' : 'Registrarse'}
              </Button>

              <div className='text-center text-sm'>
                ¿Ya tienes una cuenta?{' '}
                <Link href='/login' className='underline underline-offset-4'>
                  Inicia sesión
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
