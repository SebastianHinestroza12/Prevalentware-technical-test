'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ConfirmDeleteDialogProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export const ConfirmDeleteDialog = ({
  onConfirm,
  onCancel,
}: ConfirmDeleteDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás seguro?</DialogTitle>
          <p>No podrás deshacer esta acción.</p>
        </DialogHeader>
        <div className='flex justify-end gap-2 mt-4'>
          <Button variant='outline' onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            className='bg-red-600 text-white flex items-center gap-2'
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='w-4 h-4 animate-spin' /> Eliminando...
              </>
            ) : (
              'Sí, eliminar'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
