'use client';

import { useState } from 'react';
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
import { useCreateMovement } from '@/hooks/useCreateMovement';
import { useUpdateMovement } from '@/hooks/useUpdateMovements';
import { useDeleteMovement } from '@/hooks/useDeleteMovements';
import { MovementForm } from '@/components/Form/MovementForm';
import { ConfirmDeleteDialog } from '@/components/ConfirmDeleteDialog';
import { type MovementFormData } from '@/schemas/movement.schema';
import { useUserMovements } from '@/hooks/useUserMovements';
import { useUserStore } from '@/store/userStore';

export default function TransaccionesPage() {
  const { data: session, isPending } = authClient.useSession();
  const { user } = useUserStore();
  const { data: movements, isLoading } = useUserMovements(session?.user.id);

  const createMutation = useCreateMovement();
  const updateMutation = useUpdateMovement();
  const deleteMutation = useDeleteMovement();

  const [openCreate, setOpenCreate] = useState(false);
  const [editingMovement, setEditingMovement] =
    useState<MovementFormData | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = async (values: MovementFormData) => {
    try {
      await createMutation.mutateAsync({
        ...values,
        userId: session?.user?.id || '',
      });
      setOpenCreate(false);
    } catch (error) {
      console.error('❌ Error creating movement:', error);
    }
  };

  const handleUpdate = async (values: MovementFormData) => {
    if (!editingMovement) return;
    try {
      await updateMutation.mutateAsync({
        ...values,
        id: editingMovement.userId,
      });
      setEditingMovement(null);
    } catch (error) {
      console.error('❌ Error updating movement:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error('❌ Error deleting movement:', error);
    }
  };

  if (isPending || isLoading) return <p>Cargando...</p>;

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      <Card className='shadow-lg border-0'>
        <CardHeader className='flex flex-row items-center justify-between bg-gradient-to-r from-emerald-50 to-orange-50 rounded-t-lg'>
          <CardTitle className='text-3xl font-bold text-gray-800'>
            Ingresos y Egresos
          </CardTitle>
          {user?.role.name === 'ADMIN' && (
            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
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
                <MovementForm
                  defaultValues={{
                    concept: '',
                    amount: 0,
                    date: new Date().toISOString().split('T')[0],
                    type: 'INCOME',
                    userId: session?.user?.id || '',
                  }}
                  onSubmit={handleCreate}
                  isLoading={createMutation.isPending}
                  onCancel={() => setOpenCreate(false)}
                />
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
                {(movements || []).length === 0 ? (
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
                  (movements || []).map((m, index) => (
                    <TableRow
                      key={m.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                      }`}
                    >
                      <TableCell className='font-medium text-gray-900 py-4'>
                        {m.concept}
                      </TableCell>
                      <TableCell className='py-4'>
                        <span
                          className={`font-bold text-lg ${
                            m.type === 'EXPENSE'
                              ? 'text-red-600'
                              : 'text-emerald-600'
                          }`}
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
                            onClick={() => setEditingMovement(m)}
                            className='h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                          >
                            <Edit className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => setDeleteId(m.id)}
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

      {editingMovement && (
        <Dialog
          open={!!editingMovement}
          onOpenChange={() => setEditingMovement(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Movimiento</DialogTitle>
            </DialogHeader>
            <MovementForm
              defaultValues={editingMovement}
              onSubmit={handleUpdate}
              isLoading={updateMutation.isPending}
              onCancel={() => setEditingMovement(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {deleteId && <ConfirmDeleteDialog onConfirm={handleDelete} />}
    </div>
  );
}
