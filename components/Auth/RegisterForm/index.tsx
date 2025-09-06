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
import { signUp } from '@/server/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  registerSchema,
  RegisterFormInputs,
} from '@/lib/validation/authSchema';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const result = await signUp(data.email, data.password, data.name);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success('¡Cuenta creada exitosamente!');
        router.push('/home');
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl font-bold text-emerald-600'>
            Crea tu cuenta
          </CardTitle>
          <CardDescription>
            Regístrate y empieza a gestionar tus ingresos y egresos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
              {/* Name */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nombre <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Tu nombre completo' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormLabel>
                      Contraseña <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='********'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className='text-xs text-muted-foreground'>
                      Debe tener al menos 8 caracteres, una mayúscula, una
                      minúscula, un número y un carácter especial.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type='submit'
                className='w-full bg-emerald-600 hover:bg-emerald-700 text-white'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? 'Creando cuenta...'
                  : 'Registrarse'}
              </Button>

              {/* Login link */}
              <div className='text-center text-sm'>
                ¿Ya tienes una cuenta?{' '}
                <Link
                  href='/login'
                  className='text-emerald-600 hover:underline'
                >
                  Inicia sesión aquí
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
