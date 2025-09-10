'use client';

import { ReactNode } from 'react';
import { useUserStore } from '@/store/userStore';
import { Unauthorized } from '@/components/Unauthorized';

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

export const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Unauthorized message='Debes iniciar sesión para acceder.' />;
  }

  if (!allowedRoles.includes(user.role.name)) {
    return (
      <Unauthorized message='No estás autorizado para acceder a este recurso.' />
    );
  }

  return <>{children}</>;
};
