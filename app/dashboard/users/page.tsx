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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Edit,
  Users,
  Mail,
  Phone,
  Shield,
  UserCheck,
  Plus,
} from 'lucide-react';
import type { User } from '@/interfaces';
import { TableSkeleton } from '@/components/Skeleton/TableSkeleton';
import { RoleGuard } from '@/components/RoleGuard';

export default function UsersPage() {
  const { data: users, isLoading, refetch } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto p-6'>
        <div className='space-y-6'>
          <div className='h-8 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg animate-pulse' />
          <Card>
            <CardContent className='p-6'>
              <TableSkeleton rows={5} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={['ADMIN']}>
      <div className='max-w-7xl mx-auto p-6 space-y-8'>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 bg-clip-text text-transparent'>
              Gestión de Usuarios
            </h1>
            <p className='text-slate-600 text-lg'>
              Administra y gestiona todos los usuarios del sistema
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border'>
              <Users className='h-4 w-4 text-slate-600' />
              <span className='text-sm font-medium text-slate-700'>
                {users?.length || 0} usuarios
              </span>
            </div>
          </div>
        </div>

        <Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
          <CardHeader className='bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/60'>
            <CardTitle className='flex items-center gap-2 text-slate-800'>
              <Users className='h-5 w-5 text-slate-600' />
              Lista de Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='overflow-hidden'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-gradient-to-r from-slate-50 to-slate-100/30 hover:bg-slate-50/80 border-b border-slate-200/60'>
                    <TableHead className='font-semibold text-slate-700 py-4 px-6'>
                      <div className='flex items-center gap-2'>
                        <UserCheck className='h-4 w-4' />
                        Nombre
                      </div>
                    </TableHead>
                    <TableHead className='font-semibold text-slate-700 py-4 px-6'>
                      <div className='flex items-center gap-2'>
                        <Mail className='h-4 w-4' />
                        Correo
                      </div>
                    </TableHead>
                    <TableHead className='font-semibold text-slate-700 py-4 px-6'>
                      <div className='flex items-center gap-2'>
                        <Phone className='h-4 w-4' />
                        Teléfono
                      </div>
                    </TableHead>
                    <TableHead className='font-semibold text-slate-700 py-4 px-6'>
                      <div className='flex items-center gap-2'>
                        <Shield className='h-4 w-4' />
                        Rol
                      </div>
                    </TableHead>
                    <TableHead className='font-semibold text-slate-700 py-4 px-6 text-center'>
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(users || []).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className='py-16 px-6'>
                        <div className='flex flex-col items-center gap-6 text-center'>
                          <div className='relative'>
                            <div className='w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center'>
                              <Users className='h-12 w-12 text-slate-400' />
                            </div>
                            <div className='absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center'>
                              <Plus className='h-4 w-4 text-white' />
                            </div>
                          </div>
                          <div className='space-y-2'>
                            <h3 className='text-xl font-semibold text-slate-800'>
                              No hay usuarios registrados
                            </h3>
                            <p className='text-slate-500 max-w-md'>
                              Comienza agregando tu primer usuario al sistema
                              para gestionar el acceso y los permisos
                            </p>
                          </div>
                          <Button className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200'>
                            <Plus className='h-4 w-4 mr-2' />
                            Agregar Primer Usuario
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users?.map((user, index) => (
                      <TableRow
                        key={user.id}
                        className='hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-transparent transition-all duration-200 border-b border-slate-100/60 group'
                      >
                        <TableCell className='py-5 px-6'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className='font-semibold text-slate-900'>
                                {user.name}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='py-5 px-6'>
                          <div className='flex items-center gap-2'>
                            <Mail className='h-4 w-4 text-slate-400' />
                            <span className='text-slate-700'>{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className='py-5 px-6'>
                          <div className='flex items-center gap-2'>
                            <Phone className='h-4 w-4 text-slate-400' />
                            <span className='text-slate-700'>
                              {user.phone ?? 'No especificado'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className='py-5 px-6'>
                          {user.role?.name === 'ADMIN' ? (
                            <Badge className='bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow'>
                              <Shield className='h-3 w-3 mr-1' />
                              Administrador
                            </Badge>
                          ) : (
                            <Badge className='bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1.5 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow'>
                              <UserCheck className='h-3 w-3 mr-1' />
                              Usuario
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className='py-5 px-6 text-center'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => setSelectedUser(user)}
                            className='h-9 w-9 p-0 rounded-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-200 group-hover:shadow-md'
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
          </CardContent>
        </Card>

        {selectedUser && (
          <EditUserDialog
            open={!!selectedUser}
            onClose={() => setSelectedUser(null)}
            user={selectedUser}
            refetch={refetch}
          />
        )}
      </div>
    </RoleGuard>
  );
}
