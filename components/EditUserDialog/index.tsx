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
  refetch
}: EditUserDialogProps) => {
  const { mutateAsync, isPending } = useUpdateUser();

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user?.name || '',
      roleId: user?.role?.id.toString() || '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: EditUserFormData) => {
    await mutateAsync({ id: user.id, body: data });
    refetch();
    onClose();
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

          {/* Botones */}
          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={onClose} type='button'>
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
