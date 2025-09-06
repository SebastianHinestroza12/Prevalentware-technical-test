'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success('Sesión cerrada exitosamente');
      router.push('/login');
    } catch (error) {
      const e = error as Error;
      toast.error(e.message || 'Error al cerrar sesión');
    }
  };

  return (
    <Button
      variant='destructive'
      className='w-full flex items-center gap-2'
      onClick={handleLogout}
    >
      <LogOut className='w-4 h-4' />
      Cerrar sesión
    </Button>
  );
};
