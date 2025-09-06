'use client';

import { Logo } from '@/components/Logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

export default async function Home() {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        {/* Sidebar */}
        <Sidebar className='border-r border-gray-200 bg-gray-50'>
          <SidebarHeader className='p-6 border-b border-gray-200'>
            <Logo />
          </SidebarHeader>
          <SidebarContent className='p-4'>
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
        </Sidebar>

        {/* Main Content */}
        <div className='flex-1 flex flex-col'>
          {/* Header */}
          <header className='border-b border-gray-200 bg-white px-6 py-4'>
            <div className='flex items-center gap-4'>
              <SidebarTrigger className='lg:hidden'>
                <Menu className='h-6 w-6' />
              </SidebarTrigger>
              <h1 className='text-2xl font-bold text-gray-900'>
                Panel de Control
              </h1>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className='flex-1 p-6 bg-gray-50'>
            <div className='max-w-6xl mx-auto'>
              <div className='mb-8'>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                  Bienvenido a FinanzasYA
                </h2>
                <p className='text-gray-600'>
                  Selecciona una opción para comenzar a gestionar tus finanzas
                </p>
              </div>

              {/* Dashboard Cards */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* Sistema de gestión de ingresos y gastos */}
                <Card className='group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200 cursor-pointer'>
                  <Link href='/dashboard/transactions'>
                    <CardHeader className='pb-4'>
                      <div className='flex items-center gap-3 mb-2'>
                        <div className='p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors'>
                          <DollarSign className='h-8 w-8 text-emerald-600' />
                        </div>
                      </div>
                      <CardTitle className='text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors'>
                        Sistema de gestión de ingresos y gastos
                      </CardTitle>
                      <CardDescription className='text-gray-600'>
                        Registra y controla todos tus ingresos y gastos de
                        manera eficiente
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'>
                        Acceder
                      </Button>
                    </CardContent>
                  </Link>
                </Card>

                {/* Gestión de usuarios */}
                <Card className='group hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200 cursor-pointer'>
                  <Link href='/dashboard/users'>
                    <CardHeader className='pb-4'>
                      <div className='flex items-center gap-3 mb-2'>
                        <div className='p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors'>
                          <Users className='h-8 w-8 text-orange-600' />
                        </div>
                      </div>
                      <CardTitle className='text-xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors'>
                        Gestión de usuarios
                      </CardTitle>
                      <CardDescription className='text-gray-600'>
                        Administra usuarios y permisos del sistema (Solo
                        administradores)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className='w-full bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'>
                        Acceder
                      </Button>
                    </CardContent>
                  </Link>
                </Card>

                {/* Reportes */}
                <Card className='group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200 cursor-pointer md:col-span-2 lg:col-span-1'>
                  <Link href='/dashboard/reports'>
                    <CardHeader className='pb-4'>
                      <div className='flex items-center gap-3 mb-2'>
                        <div className='p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors'>
                          <BarChart3 className='h-8 w-8 text-emerald-600' />
                        </div>
                      </div>
                      <CardTitle className='text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors'>
                        Reportes
                      </CardTitle>
                      <CardDescription className='text-gray-600'>
                        Visualiza estadísticas y reportes financieros detallados
                        (Solo administradores)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'>
                        Acceder
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
