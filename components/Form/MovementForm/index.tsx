'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createMovementSchema,
  type MovementFormData,
} from '@/schemas/movement.schema';
import { authClient } from '@/lib/auth/client';

interface MovementFormProps {
  defaultValues?: MovementFormData;
  onSubmit: (values: MovementFormData) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export const MovementForm = ({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
}: MovementFormProps) => {
  const { data: session } = authClient.useSession();
  
  const form = useForm<MovementFormData>({
    resolver: zodResolver(createMovementSchema),
    defaultValues: defaultValues || {
      concept: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      type: 'INCOME',
      userId: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  useEffect(() => {
    if (session?.user?.id) {
      form.setValue('userId', session.user.id);
    }
  }, [session?.user?.id, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
      <div className='grid gap-2'>
        <Label>Concepto</Label>
        <Input {...form.register('concept')} />
        {form.formState.errors.concept && (
          <span className='text-red-500 text-sm'>
            {form.formState.errors.concept.message}
          </span>
        )}
      </div>

      <div className='grid gap-2'>
        <Label>Monto</Label>
        <Input
          type='number'
          step='0.01'
          {...form.register('amount', { valueAsNumber: true })}
        />
        {form.formState.errors.amount && (
          <span className='text-red-500 text-sm'>
            {form.formState.errors.amount.message}
          </span>
        )}
      </div>

      <div className='grid gap-2'>
        <Label>Fecha</Label>
        <Input type='date' {...form.register('date')} />
        {form.formState.errors.date && (
          <span className='text-red-500 text-sm'>
            {form.formState.errors.date.message}
          </span>
        )}
      </div>

      <div className='grid gap-2'>
        <Label>Tipo</Label>
        <Select
          value={form.watch('type')}
          onValueChange={(val) =>
            form.setValue('type', val as 'INCOME' | 'EXPENSE')
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecciona el tipo' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='INCOME'>💰 Ingreso</SelectItem>
            <SelectItem value='EXPENSE'>💸 Egreso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex gap-2 pt-4'>
        {onCancel && (
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            className='flex-1'
          >
            Cancelar
          </Button>
        )}
        <Button type='submit' className='flex-1' disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
};
