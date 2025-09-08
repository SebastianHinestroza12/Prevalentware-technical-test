export const getRoleLabel = (role?: string): string => {
  switch (role) {
    case 'USER':
      return 'Usuario';
    case 'ADMIN':
      return 'Administrador';
    default:
      return 'Invitado';
  }
};
