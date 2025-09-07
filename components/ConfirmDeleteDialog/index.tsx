'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDeleteDialogProps {
  onConfirm: () => void;
}

export const ConfirmDeleteDialog = ({
  onConfirm,
}: ConfirmDeleteDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant='ghost' className='text-red-600'>
        Eliminar
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <p>No podrás deshacer esta acción.</p>
      </DialogHeader>
      <div className='flex justify-end gap-2 mt-4'>
        <Button variant='outline' onClick={() => {}}>
          Cancelar
        </Button>
        <Button className='bg-red-600 text-white' onClick={onConfirm}>
          Sí, eliminar
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
