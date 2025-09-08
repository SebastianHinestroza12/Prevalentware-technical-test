'use client';

import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  TrendingUp,
  PieChart,
  FileText,
  Shield,
  Zap,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-background flex flex-col'>
      {/* Header */}
      <header className='border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <Logo />
          <div className='flex items-center gap-4'>
            <Link href='/login'>
              <Button
                variant='ghost'
                className='text-foreground hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 font-medium cursor-pointer'
              >
                Iniciar Sesión
              </Button>
            </Link>
            <Link href='/register'>
              <Button className='bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer'>
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 flex items-center'>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <h1 className='text-4xl lg:text-5xl font-bold text-balance leading-tight'>
                  Controla tus{' '}
                  <span className='text-emerald-600'>finanzas</span> de manera{' '}
                  <span className='text-orange-500'>inteligente</span>
                </h1>
                <p className='text-xl text-muted-foreground text-pretty leading-relaxed'>
                  Gestiona tus ingresos y gastos, genera reportes detallados y
                  toma decisiones financieras informadas con FinanzasYA.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Link href='/register'>
                  <Button
                    size='lg'
                    className='bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto cursor-pointer'
                  >
                    <Zap className='mr-2 h-5 w-5' />
                    Comenzar Gratis
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-6 pt-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-emerald-600'>
                    100%
                  </div>
                  <div className='text-sm text-muted-foreground'>Seguro</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-emerald-600'>
                    24/7
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    Disponible
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-emerald-600'>
                    Gratis
                  </div>
                  <div className='text-sm text-muted-foreground'>Siempre</div>
                </div>
              </div>
            </div>

            <div className='grid gap-6'>
              <Card className='border border-gray-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 bg-white'>
                <CardHeader className='pb-4'>
                  <div className='flex items-center gap-4'>
                    <div className='p-3 bg-emerald-100 rounded-xl'>
                      <TrendingUp className='h-7 w-7 text-emerald-600' />
                    </div>
                    <CardTitle className='text-xl font-semibold text-gray-900'>
                      Seguimiento de Ingresos
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base text-gray-600 leading-relaxed'>
                    Registra y categoriza todos tus ingresos de manera simple y
                    organizada para un mejor control financiero.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className='border border-gray-200 hover:border-orange-200 hover:shadow-xl transition-all duration-300 bg-white'>
                <CardHeader className='pb-4'>
                  <div className='flex items-center gap-4'>
                    <div className='p-3 bg-orange-100 rounded-xl'>
                      <PieChart className='h-7 w-7 text-orange-500' />
                    </div>
                    <CardTitle className='text-xl font-semibold text-gray-900'>
                      Control de Gastos
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base text-gray-600 leading-relaxed'>
                    Monitorea tus gastos diarios y identifica patrones para
                    optimizar tu presupuesto personal.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className='border border-gray-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 bg-white'>
                <CardHeader className='pb-4'>
                  <div className='flex items-center gap-4'>
                    <div className='p-3 bg-emerald-100 rounded-xl'>
                      <FileText className='h-7 w-7 text-emerald-600' />
                    </div>
                    <CardTitle className='text-xl font-semibold text-gray-900'>
                      Reportes Detallados
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base text-gray-600 leading-relaxed'>
                    Genera reportes completos de tu actividad financiera y
                    exporta tus datos cuando lo necesites.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mt-20'>
            <div className='text-center space-y-4'>
              <div className='mx-auto w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-lg'>
                <Shield className='h-8 w-8 text-emerald-600' />
              </div>
              <h3 className='font-bold text-xl text-gray-900'>
                Seguridad Total
              </h3>
              <p className='text-gray-600 text-base leading-relaxed'>
                Tus datos financieros están protegidos con encriptación de nivel
                bancario y los más altos estándares de seguridad.
              </p>
            </div>

            <div className='text-center space-y-4'>
              <div className='mx-auto w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center shadow-lg'>
                <Users className='h-8 w-8 text-orange-500' />
              </div>
              <h3 className='font-bold text-xl text-gray-900'>Multi-usuario</h3>
              <p className='text-gray-600 text-base leading-relaxed'>
                Gestión completa de roles y permisos para equipos de trabajo y
                administradores del sistema.
              </p>
            </div>

            <div className='text-center space-y-4'>
              <div className='mx-auto w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-lg'>
                <Zap className='h-8 w-8 text-emerald-600' />
              </div>
              <h3 className='font-bold text-xl text-gray-900'>Fácil de Usar</h3>
              <p className='text-gray-600 text-base leading-relaxed'>
                Interfaz intuitiva y moderna diseñada para que cualquier persona
                pueda gestionar sus finanzas sin complicaciones.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
