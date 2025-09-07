'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { MovementsService } from '@/services/movements.service';

export const useDeleteMovement = () => {
  return useMutation<void, Error, string>({
    mutationFn: (id) => MovementsService.deleteMovement(id),
    onSuccess: () => {
      toast.success('Movimiento eliminado con éxito');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar movimiento');
    },
  });
};
