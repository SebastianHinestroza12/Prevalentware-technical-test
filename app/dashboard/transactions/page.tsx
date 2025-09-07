'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  PlusCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Edit,
  Trash2,
  DollarSign,
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { useCreateMovement } from '@/hooks/useCreateMovement';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createMovementSchema,
  type MovementFormData,
} from '@/schemas/movement.schema';

export default function TransaccionesPage() {
  const { data: session, isPending } = authClient.useSession();
  const { data: user, isLoading: userLoading } = useUser(session?.user?.id);
  const [open, setOpen] = useState(false);

  const createMutation = useCreateMovement();

  const form = useForm<MovementFormData>({
    resolver: zodResolver(createMovementSchema),
    defaultValues: {
      concept: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      type: 'INCOME',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (session?.user?.id) {
      form.setValue('userId', session.user.id);
    }
  }, [session?.user?.id, form]);

  const onSubmit = async (values: MovementFormData) => {
    try {
      await createMutation.mutateAsync(values);

      setOpen(false);
      form.reset({
        concept: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        type: 'INCOME',
        userId: session?.user?.id || '',
      });
    } catch (error) {
      console.error('❌ Error creating movement:', error);
    }
  };

  const handleEdit = (movementId: string) => {
    console.log(movementId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (movementId: string) => {
    console.log('[v0] Delete movement:', movementId);
    // TODO: Implement delete functionality
  };

  if (isPending || userLoading) return <p>Cargando...</p>;

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      <Card className='shadow-lg border-0'>
        <CardHeader className='flex flex-row items-center justify-between bg-gradient-to-r from-emerald-50 to-orange-50 rounded-t-lg'>
          <CardTitle className='text-3xl font-bold text-gray-800'>
            Ingresos y Egresos
          </CardTitle>
          {user?.role.name === 'ADMIN' && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className='flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer'>
                  <PlusCircle className='w-4 h-4' /> Nuevo Movimiento
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                  <DialogTitle className='text-xl font-bold text-gray-800'>
                    Nuevo Movimiento
                  </DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='grid gap-4 py-4'
                >
                  <div className='grid gap-2'>
                    <Label className='font-semibold text-gray-700'>
                      Concepto
                    </Label>
                    <Input
                      {...form.register('concept')}
                      placeholder='Ej: Venta de producto, Pago de servicios...'
                      className='border-gray-300 focus:border-emerald-500'
                    />
                    {form.formState.errors.concept && (
                      <span className='text-red-500 text-sm'>
                        {form.formState.errors.concept.message}
                      </span>
                    )}
                  </div>

                  <div className='grid gap-2'>
                    <Label className='font-semibold text-gray-700'>Monto</Label>
                    <Input
                      type='number'
                      step='0.01'
                      min='0'
                      placeholder='0.00'
                      className='border-gray-300 focus:border-emerald-500'
                      {...form.register('amount', { valueAsNumber: true })}
                    />
                    {form.formState.errors.amount && (
                      <span className='text-red-500 text-sm'>
                        {form.formState.errors.amount.message}
                      </span>
                    )}
                  </div>

                  <div className='grid gap-2'>
                    <Label className='font-semibold text-gray-700'>Fecha</Label>
                    <Input
                      type='date'
                      className='border-gray-300 focus:border-emerald-500'
                      {...form.register('date')}
                    />
                    {form.formState.errors.date && (
                      <span className='text-red-500 text-sm'>
                        {form.formState.errors.date.message}
                      </span>
                    )}
                  </div>

                  <div className='grid gap-2'>
                    <Label className='font-semibold text-gray-700'>Tipo</Label>
                    <Select
                      value={form.watch('type')}
                      onValueChange={(val) =>
                        form.setValue('type', val as 'INCOME' | 'EXPENSE')
                      }
                    >
                      <SelectTrigger className='border-gray-300 focus:border-emerald-500'>
                        <SelectValue placeholder='Selecciona el tipo' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='INCOME'>💰 Ingreso</SelectItem>
                        <SelectItem value='EXPENSE'>💸 Egreso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='flex gap-2 pt-4'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setOpen(false)}
                      className='flex-1 cursor-pointer'
                    >
                      Cancelar
                    </Button>
                    <Button
                      type='submit'
                      disabled={createMutation.isPending}
                      className='flex-1 bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                    >
                      {createMutation.isPending ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>

        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow className='bg-gray-50 hover:bg-gray-50'>
                  <TableHead className='font-bold text-gray-700 py-4'>
                    Concepto
                  </TableHead>
                  <TableHead className='font-bold text-gray-700 py-4'>
                    Monto
                  </TableHead>
                  <TableHead className='font-bold text-gray-700 py-4'>
                    Fecha
                  </TableHead>
                  <TableHead className='font-bold text-gray-700 py-4'>
                    Usuario
                  </TableHead>
                  <TableHead className='font-bold text-gray-700 py-4'>
                    Tipo
                  </TableHead>
                  <TableHead className='font-bold text-gray-700 py-4 text-center'>
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(user?.movements || []).length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-center py-8 text-gray-500'
                    >
                      <div className='flex flex-col items-center gap-2'>
                        <DollarSign className='w-12 h-12 text-gray-300' />
                        <p className='text-lg font-medium'>
                          No hay movimientos registrados
                        </p>
                        <p className='text-sm'>
                          Crea tu primer movimiento para comenzar
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  (user?.movements || []).map((m, index) => (
                    <TableRow
                      key={m.id}
                      className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                    >
                      <TableCell className='font-medium text-gray-900 py-4'>
                        {m.concept}
                      </TableCell>
                      <TableCell className='py-4'>
                        <span
                          className={`font-bold text-lg ${m.type === 'EXPENSE' ? 'text-red-600' : 'text-emerald-600'}`}
                        >
                          {m.type === 'EXPENSE' ? '-' : '+'}
                          {m.amount.toLocaleString('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                          })}
                        </span>
                      </TableCell>
                      <TableCell className='text-gray-600 py-4'>
                        {new Date(m.date).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className='text-gray-600 py-4'>
                        {session?.user.name}
                      </TableCell>
                      <TableCell className='py-4'>
                        {m.type === 'EXPENSE' ? (
                          <span className='flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium w-fit'>
                            <ArrowDownCircle className='w-4 h-4' /> Egreso
                          </span>
                        ) : (
                          <span className='flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm font-medium w-fit'>
                            <ArrowUpCircle className='w-4 h-4' /> Ingreso
                          </span>
                        )}
                      </TableCell>
                      <TableCell className='py-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleEdit(m.id)}
                            className='h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                          >
                            <Edit className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDelete(m.id)}
                            className='h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 cursor-pointer'
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
