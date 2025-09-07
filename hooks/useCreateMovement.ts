'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { MovementsService } from '@/services/movements.service';
import { MovementResponse } from '@/interfaces';
import { MovementFormData } from '@/schemas/movement.schema';

export const useCreateMovement = () => {
  return useMutation<MovementResponse, Error, MovementFormData>({
    mutationFn: (data) => MovementsService.createMovement(data),
    onSuccess: () => {
      toast.success('Movimiento creado con éxito');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear movimiento');
    },
  });
};
