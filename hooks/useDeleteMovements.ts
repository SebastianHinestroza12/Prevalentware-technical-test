'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { MovementsService } from '@/services/movements.service';

export const useDeleteMovement = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => MovementsService.deleteMovement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'movements'],
        exact: false,
      });
      toast.success('Movimiento eliminado con éxito');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar movimiento');
    },
  });
};
