'use client';

import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { EditUserDialog } from '@/components/EditUserDialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';
import { User } from '@/interfaces';
import { TableSkeleton } from '@/components/Skeleton/TableSkeleton';

export default function UsersPage() {
  const { data: users, isLoading, refetch } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (isLoading) {
    return <TableSkeleton rows={5} />;
  }

  return (
    <div className='max-w-6xl mx-auto mt-6'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900'>
        Gestión de Usuarios
      </h1>

      <div className='bg-white shadow rounded-lg overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow className='bg-gray-50'>
              <TableHead className='font-semibold text-gray-700 py-3'>
                Nombre
              </TableHead>
              <TableHead className='font-semibold text-gray-700 py-3'>
                Correo
              </TableHead>
              <TableHead className='font-semibold text-gray-700 py-3'>
                Teléfono
              </TableHead>
              <TableHead className='font-semibold text-gray-700 py-3'>
                Rol
              </TableHead>
              <TableHead className='font-semibold text-gray-700 py-3 text-center'>
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(users || []).length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='text-center py-10 text-gray-500'
                >
                  <div className='flex flex-col items-center gap-2'>
                    <p className='text-lg font-medium'>
                      No hay usuarios registrados
                    </p>
                    <p className='text-sm'>Agrega un usuario para comenzar</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users?.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
                >
                  <TableCell className='py-4 font-medium text-gray-900'>
                    {user.name}
                  </TableCell>
                  <TableCell className='py-4'>{user.email}</TableCell>
                  <TableCell className='py-4'>{user.phone ?? 'N/A'}</TableCell>
                  <TableCell className='py-4'>
                    {user.role?.name === 'ADMIN' ? (
                      <Badge
                        variant='secondary'
                        className='bg-blue-50 text-blue-700 px-3 py-1 rounded-full'
                      >
                        Administrador
                      </Badge>
                    ) : (
                      <Badge
                        variant='secondary'
                        className='bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full'
                      >
                        Usuario
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className='py-4 text-center'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setSelectedUser(user)}
                      className='h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600'
                    >
                      <Edit className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedUser && (
        <EditUserDialog
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
          refetch={refetch}
        />
      )}
    </div>
  );
}
