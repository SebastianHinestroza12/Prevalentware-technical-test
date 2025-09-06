import { createElement } from 'react';
import { DollarSign, Users, BarChart3 } from 'lucide-react';
import type { ColorVariant } from '@/utils/colorClasses';

export interface DashboardCardData {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: ColorVariant;
}

export const CARDS: DashboardCardData[] = [
  {
    title: 'Sistema de gestión de ingresos y gastos',
    description:
      'Registra y controla todos tus ingresos y gastos de manera eficiente',
    href: '/dashboard/transactions',
    icon: createElement(DollarSign, { className: 'h-8 w-8 text-emerald-600' }),
    color: 'emerald',
  },
  {
    title: 'Gestión de usuarios',
    description:
      'Administra usuarios y permisos del sistema (Solo administradores)',
    href: '/dashboard/users',
    icon: createElement(Users, { className: 'h-8 w-8 text-orange-600' }),
    color: 'orange',
  },
  {
    title: 'Reportes',
    description:
      'Visualiza estadísticas y reportes financieros detallados (Solo administradores)',
    href: '/dashboard/reports',
    icon: createElement(BarChart3, { className: 'h-8 w-8 text-emerald-600' }),
    color: 'emerald',
  },
];