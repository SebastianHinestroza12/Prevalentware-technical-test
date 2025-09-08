'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editUserSchema, EditUserFormData } from '@/schemas/user.schema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useUpdateUser } from '@/hooks/useUsers';
import { authClient } from '@/lib/auth/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role?: { id: number; name: string };
  };
  refetch: () => void;
}

export const EditUserDialog = ({
  open,
  onClose,
  user,
  refetch,
}: EditUserDialogProps) => {
  const { mutateAsync, isPending } = useUpdateUser();
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user?.name || '',
      roleId: user?.role?.id.toString() || '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: EditUserFormData) => {
    try {
      // Verificar si el usuario está editando su propio perfil
      const isEditingOwnProfile = session?.user?.id === user.id;

      // Verificar si se está cambiando el rol
      const isChangingRole = data.roleId !== user?.role?.id.toString();

      // Actualizar el usuario
      await mutateAsync({ id: user.id, body: data });
      refetch();
      onClose();

      // Si el usuario está editando su propio perfil y cambió su rol
      if (isEditingOwnProfile && isChangingRole) {
        // Cerrar la sesión
        await authClient.signOut();
        router.push('/login');
      }
    } catch (error) {
      console.error('❌ Error actualizando usuario:', error);
      toast.error('Error al actualizar el usuario');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold'>
            Editar Usuario
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Nombre */}
          <div>
            <label className='block mb-1 text-sm font-medium'>Nombre</label>
            <Input {...form.register('name')} placeholder='Nombre completo' />
            {form.formState.errors.name && (
              <p className='text-red-500 text-sm'>
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Rol */}
          <div>
            <label className='block mb-1 text-sm font-medium'>Rol</label>
            <Select
              onValueChange={(val) => form.setValue('roleId', val)}
              defaultValue={form.getValues('roleId')}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecciona un rol' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>Administrador</SelectItem>
                <SelectItem value='2'>Usuario</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.roleId && (
              <p className='text-red-500 text-sm'>
                {form.formState.errors.roleId.message}
              </p>
            )}
          </div>

          {/* Advertencia si está editando su propio rol */}
          {session?.user?.id === user.id && (
            <div className='bg-amber-50 border border-amber-200 rounded-md p-3'>
              <div className='flex items-center'>
                <div className='text-amber-600 text-sm'>
                  ⚠️ <strong>Advertencia:</strong> Si cambias tu propio rol, tu
                  sesión se cerrará automáticamente y deberás iniciar sesión
                  nuevamente.
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className='flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={onClose}
              type='button'
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
              {isPending ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
