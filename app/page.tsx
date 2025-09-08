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
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-emerald-50/30 flex flex-col'>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'
      >
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <Logo />
          <div className='flex items-center gap-4'>
            <Link href='/login'>
              <Button
                variant='ghost'
                className='text-foreground hover:bg-emerald-600/10 hover:text-emerald-600 transition-all duration-300 font-medium'
              >
                Iniciar Sesión
              </Button>
            </Link>
            <Link href='/register'>
              <Button className='bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300'>
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className='flex-1'>
        <section className='container mx-auto px-4 py-12 lg:py-20'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='space-y-6'
            >
              <div className='space-y-5'>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className='inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-200'
                >
                  <Sparkles className='h-4 w-4 fill-current animate-pulse' />
                  Control financiero personal
                </motion.div>

                <h1 className='text-4xl lg:text-6xl font-black text-balance leading-tight'>
                  Organiza tus{' '}
                  <span className='bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent'>
                    finanzas
                  </span>{' '}
                  de forma{' '}
                  <span className='bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent'>
                    simple
                  </span>
                </h1>

                <p className='text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl'>
                  Lleva un registro claro de tus ingresos y gastos. Una
                  herramienta sencilla para tener mejor control de tu dinero y
                  tomar decisiones más informadas.
                </p>
              </div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className='flex flex-col sm:flex-row gap-4'
              >
                <Link href='/register'>
                  <Button
                    size='lg'
                    className='bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4 group'
                  >
                    <Zap className='mr-2 h-5 w-5 group-hover:animate-pulse' />
                    Comenzar Gratis
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className='grid grid-cols-3 gap-6 pt-6 border-t border-border/50'
              >
                {[
                  { value: 'Fácil', label: 'De usar' },
                  { value: 'Rápido', label: 'Registro' },
                  { value: 'Gratis', label: 'Empezar' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className='text-center group cursor-pointer'
                  >
                    <div className='text-2xl font-bold text-emerald-600 mb-1 group-hover:text-orange-500 transition-colors duration-300'>
                      {stat.value}
                    </div>
                    <div className='text-sm text-muted-foreground font-medium'>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='grid gap-5'
            >
              {[
                {
                  icon: TrendingUp,
                  title: 'Registro de Ingresos',
                  description:
                    'Anota tus ingresos de trabajo, ventas o cualquier entrada de dinero para tener un registro completo.',
                  gradient: 'from-emerald-50 to-emerald-25',
                  iconBg: 'bg-emerald-100',
                  iconColor: 'text-emerald-600',
                  delay: 0.1,
                },
                {
                  icon: PieChart,
                  title: 'Control de Gastos',
                  description:
                    'Registra tus gastos diarios y categorizalos para entender en qué se va tu dinero.',
                  gradient: 'from-orange-50 to-orange-25',
                  iconBg: 'bg-orange-100',
                  iconColor: 'text-orange-500',
                  delay: 0.2,
                },
                {
                  icon: FileText,
                  title: 'Reportes Simples',
                  description:
                    'Ve resúmenes de tus movimientos financieros y exporta la información cuando la necesites.',
                  gradient: 'from-emerald-50 to-emerald-25',
                  iconBg: 'bg-emerald-100',
                  iconColor: 'text-emerald-600',
                  delay: 0.3,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: feature.delay, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className='group'
                >
                  <Card className='border border-border/50 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm overflow-hidden relative'>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                    />
                    <CardHeader className='pb-3 relative z-10'>
                      <div className='flex items-center gap-3'>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`p-3 ${feature.iconBg} rounded-xl group-hover:shadow-lg transition-all duration-300`}
                        >
                          <feature.icon
                            className={`h-6 w-6 ${feature.iconColor}`}
                          />
                        </motion.div>
                        <CardTitle className='text-lg font-bold text-card-foreground group-hover:text-emerald-700 transition-colors duration-300'>
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className='relative z-10'>
                      <CardDescription className='text-muted-foreground leading-relaxed'>
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className='bg-gradient-to-br from-emerald-50/50 to-orange-50/30 py-16'>
          <div className='container mx-auto px-4'>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-12'
            >
              <h2 className='text-3xl lg:text-5xl font-black text-balance mb-4'>
                ¿Por qué usar{' '}
                <span className='bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent'>
                  FinanzasYA
                </span>
                ?
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
                Una herramienta simple para llevar control de tus finanzas
                personales
              </p>
            </motion.div>

            <div className='grid md:grid-cols-3 gap-10'>
              {[
                {
                  icon: Shield,
                  title: 'Datos Seguros',
                  description:
                    'Tu información se guarda de forma segura en nuestros servidores con medidas de protección estándar.',
                  delay: 0.1,
                },
                {
                  icon: Users,
                  title: 'Fácil Compartir',
                  description:
                    'Comparte el acceso con tu familia o socios para llevar un control conjunto de las finanzas.',
                  delay: 0.2,
                },
                {
                  icon: Zap,
                  title: 'Interfaz Simple',
                  description:
                    'Diseño limpio y fácil de usar para que puedas empezar a registrar tus movimientos de inmediato.',
                  delay: 0.3,
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: benefit.delay, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className='text-center space-y-4 group'
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='mx-auto w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:bg-orange-100 transition-all duration-300'
                  >
                    <benefit.icon className='h-8 w-8 text-emerald-600 group-hover:text-orange-500 transition-colors duration-300' />
                  </motion.div>
                  <h3 className='font-bold text-xl text-foreground group-hover:text-emerald-600 transition-colors duration-300'>
                    {benefit.title}
                  </h3>
                  <p className='text-muted-foreground leading-relaxed max-w-sm mx-auto'>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className='py-16 bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 relative overflow-hidden'
        >
          <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20' />
          <div className='container mx-auto px-4 text-center relative z-10'>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='max-w-3xl mx-auto space-y-6'
            >
              <h2 className='text-3xl lg:text-5xl font-black text-white text-balance'>
                Empieza a organizar tus finanzas hoy
              </h2>
              <p className='text-lg text-white/90 text-pretty max-w-xl mx-auto'>
                Únete a otros usuarios que ya llevan un mejor control de sus
                ingresos y gastos
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className='flex justify-center'
              >
                <Link href='/register'>
                  <Button
                    size='lg'
                    variant='secondary'
                    className='bg-white text-emerald-600 hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg px-10 py-4 group'
                  >
                    <CheckCircle className='mr-2 h-5 w-5 group-hover:animate-pulse' />
                    Comenzar Ahora
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
