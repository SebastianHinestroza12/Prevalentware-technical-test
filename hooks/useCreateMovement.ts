'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { MovementsService } from '@/services/movements.service';
import { MovementResponse } from '@/interfaces';
import { MovementFormData } from '@/schemas/movement.schema';

export const useCreateMovement = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MovementResponse,
    Error,
    MovementFormData
  >({
    mutationFn: (data) => MovementsService.createMovement(data),
    onSuccess: () => {
      // refrescar cache de usuario
      queryClient.invalidateQueries({ queryKey: ['user'], exact: false });

      toast.success('Movimiento creado con éxito');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear movimiento');
    },
  });
}
