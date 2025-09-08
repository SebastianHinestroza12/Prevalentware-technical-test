'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { UsersService } from '@/services/users.service';
import { User  } from '@/interfaces';
import { EditUserFormData } from '@/schemas/user.schema';
import { toast } from 'react-hot-toast';

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => UsersService.getUsers(),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: Partial<EditUserFormData>;
    }) => UsersService.updateUser(id, body),
    onSuccess: () => {
      toast.success('Usuario actualizado con éxito');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al actualizar usuario');
    }
  });
};
