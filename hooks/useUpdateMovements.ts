'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { MovementsService } from '@/services/movements.service';
import { MovementResponse } from '@/interfaces';
import { MovementFormData } from '@/schemas/movement.schema';

export const useUpdateMovement = () => {
  return useMutation<
    MovementResponse,
    Error,
    Partial<MovementFormData> & { id: string }
  >({
    mutationFn: (data) => MovementsService.updateMovement(data),
    onSuccess: () => {
      toast.success('Movimiento actualizado con éxito');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al actualizar movimiento');
    },
  });
};