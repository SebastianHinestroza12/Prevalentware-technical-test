'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/client';
import { LogOut, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      router.push('/login');
      toast.success('Sesión cerrada exitosamente');
    } catch (error) {
      const e = error as Error;
      toast.error(e.message || 'Error al cerrar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant='destructive'
      className='w-full flex items-center gap-2'
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className='w-4 h-4 animate-spin' />
          Cerrando sesión...
        </>
      ) : (
        <>
          <LogOut className='w-4 h-4' />
          Cerrar sesión
        </>
      )}
    </Button>
  );
};
