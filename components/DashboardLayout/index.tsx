'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { DollarSign, Users, BarChart3, Menu } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { LogoutButton } from '@/components/Auth/LogoutButton';
import { authClient } from '@/lib/auth/client';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        {/* Sidebar */}
        <Sidebar className='border-r border-gray-200 bg-gray-50'>
          <div className='flex flex-col h-full'>
            <SidebarHeader className='p-6 border-b border-gray-200'>
              <Logo />
            </SidebarHeader>

            <SidebarContent className='p-4 flex-1'>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className='w-full justify-start p-3 mb-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors'
                  >
                    <Link
                      href='/dashboard/transactions'
                      className='flex items-center gap-3'
                    >
                      <DollarSign className='h-5 w-5' />
                      <span className='font-medium'>Ingresos y egresos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className='w-full justify-start p-3 mb-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors'
                  >
                    <Link
                      href='/dashboard/users'
                      className='flex items-center gap-3'
                    >
                      <Users className='h-5 w-5' />
                      <span className='font-medium'>Usuarios</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className='w-full justify-start p-3 mb-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors'
                  >
                    <Link
                      href='/dashboard/reports'
                      className='flex items-center gap-3'
                    >
                      <BarChart3 className='h-5 w-5' />
                      <span className='font-medium'>Reportes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>

            <div className='p-4 border-t border-gray-200 mt-auto'>
              <LogoutButton />
            </div>
          </div>
        </Sidebar>

        {/* Main Content */}
        <div className='flex-1 flex flex-col'>
          <header className='border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <SidebarTrigger className='lg:hidden'>
                <Menu className='h-6 w-6' />
              </SidebarTrigger>
              <h1 className='text-2xl font-bold text-gray-900'>
                Panel de Control
              </h1>
            </div>

            {session?.user && (
              <div className='flex items-center gap-3'>
                <div className='text-right'>
                  <p className='text-sm text-gray-500'>¡Hola 👋!</p>
                  <p className='text-base font-semibold text-gray-800'>
                    {session.user.name}
                  </p>
                </div>
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className='w-10 h-10 rounded-full border border-gray-200 shadow-sm'
                  />
                )}
              </div>
            )}
          </header>

          <main className='flex-1 p-6 bg-gray-50'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
