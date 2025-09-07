import { createElement } from 'react';
import { DollarSign, Users, BarChart3 } from 'lucide-react';
import type { ColorVariant } from '@/utils/colorClasses';

export interface DashboardCardData {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: ColorVariant;
  roles: ('USER' | 'ADMIN')[];
}

export const CARDS: DashboardCardData[] = [
  {
    title: 'Sistema de gestión de ingresos y gastos',
    description:
      'Registra y controla todos tus ingresos y gastos de manera eficiente',
    href: '/dashboard/transactions',
    icon: createElement(DollarSign, { className: 'h-8 w-8 text-emerald-600' }),
    color: 'emerald',
    roles: ['USER', 'ADMIN'],
  },
  {
    title: 'Gestión de usuarios',
    description:
      'Administra usuarios y permisos del sistema (Solo administradores)',
    href: '/dashboard/users',
    icon: createElement(Users, { className: 'h-8 w-8 text-orange-600' }),
    color: 'orange',
    roles: ['ADMIN'],
  },
  {
    title: 'Reportes',
    description:
      'Visualiza estadísticas y reportes financieros detallados (Solo administradores)',
    href: '/dashboard/reports',
    icon: createElement(BarChart3, { className: 'h-8 w-8 text-emerald-600' }),
    color: 'emerald',
    roles: ['ADMIN'],
  },
];

export const MENU_ITEMS = [
  {
    label: 'Ingresos y egresos',
    href: '/dashboard/transactions',
    icon: DollarSign,
    roles: ['USER', 'ADMIN'],
  },
  {
    label: 'Usuarios',
    href: '/dashboard/users',
    icon: Users,
    roles: ['ADMIN'],
  },
  {
    label: 'Reportes',
    href: '/dashboard/reports',
    icon: BarChart3,
    roles: ['ADMIN'],
  },
];

export const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;