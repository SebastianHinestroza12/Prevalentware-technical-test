'use client';

import { useReports } from '@/hooks/useReports';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Download,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';
import { downloadCSV } from '@/utils/csv';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/currency';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations';
export default function ReportsPage() {
  const { data, isLoading, isError } = useReports();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <Loader2 className='w-8 h-8 animate-spin text-emerald-600' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center h-64'>
        <p className='text-red-600 text-lg'>Error cargando reportes</p>
      </div>
    );
  }

  const { totalIncome, totalExpense, balance, usersCount } = data?.data || {};

  const chartData = [
    { name: 'Ingresos', value: totalIncome || 0, color: '#10b981' },
    { name: 'Egresos', value: totalExpense || 0, color: '#ef4444' },
  ];

  const pieData = [
    { name: 'Ingresos', value: totalIncome || 0, color: '#10b981' },
    { name: 'Egresos', value: totalExpense || 0, color: '#ef4444' },
  ];

  return (
    <motion.div className='space-y-8 p-6 bg-gray-50 min-h-screen' {...fadeIn}>
      {/* Header with Export Button */}
      <motion.div className='flex justify-between items-center' {...fadeInUp}>
        <div className='flex items-center gap-3'>
          <div className='p-3 bg-emerald-100 rounded-xl'>
            <BarChart3 className='w-6 h-6 text-emerald-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Reportes Financieros
            </h1>
            <p className='text-gray-600 mt-1'>
              Análisis completo de tus movimientos financieros
            </p>
          </div>
        </div>
        <Button
          onClick={downloadCSV}
          className='bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2'
        >
          <Download className='w-4 h-4' />
          Exportar CSV
        </Button>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
        {...staggerContainer}
      >
        <motion.div {...fadeInUp}>
          <Card className='relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Total Usuarios
              </CardTitle>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <Users className='h-4 w-4 text-blue-600' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-gray-900'>
                {usersCount || 0}
              </div>
              <p className='text-xs text-gray-500 mt-1'>Usuarios registrados</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card className='relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Total Ingresos
              </CardTitle>
              <div className='p-2 bg-emerald-100 rounded-lg'>
                <TrendingUp className='h-4 w-4 text-emerald-600' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-emerald-600'>
                {formatCurrency(totalIncome || 0)}
              </div>
              <p className='text-xs text-gray-500 mt-1'>Ingresos totales</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card className='relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Total Egresos
              </CardTitle>
              <div className='p-2 bg-red-100 rounded-lg'>
                <TrendingDown className='h-4 w-4 text-red-600' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-red-600'>
                {formatCurrency(totalExpense || 0)}
              </div>
              <p className='text-xs text-gray-500 mt-1'>Egresos totales</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card className='relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                Balance Total
              </CardTitle>
              <div
                className={`p-2 rounded-lg ${
                  (balance || 0) >= 0 ? 'bg-emerald-100' : 'bg-red-100'
                }`}
              >
                <DollarSign
                  className={`h-4 w-4 ${
                    (balance || 0) >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  (balance || 0) >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {formatCurrency(balance || 0)}
              </div>
              <p className='text-xs text-gray-500 mt-1'>Balance neto</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Bar Chart */}
        <motion.div {...fadeInUp}>
          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-emerald-100 rounded-lg'>
                  <BarChart3 className='w-5 h-5 text-emerald-600' />
                </div>
                <CardTitle className='text-xl font-semibold text-gray-900'>
                  Comparativo Financiero
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className='h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey='name'
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip
                      formatter={(value) => [formatCurrency(Number(value)), '']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: '#1f2937',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey='value'
                      fill='#10b981'
                      radius={[4, 4, 0, 0]}
                      name='Monto'
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pie Chart */}
        <motion.div {...fadeInUp}>
          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-orange-100 rounded-lg'>
                  <PieChart className='w-5 h-5 text-orange-600' />
                </div>
                <CardTitle className='text-xl font-semibold text-gray-900'>
                  Distribución de Movimientos
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className='h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                  <RechartsPieChart>
                    <Tooltip
                      formatter={(value) => [formatCurrency(Number(value)), '']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: '#1f2937',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend />
                    <Pie
                      data={pieData}
                      cx='50%'
                      cy='50%'
                      outerRadius={100}
                      fill='#8884d8'
                      dataKey='value'
                      label={({ name, percent }) =>
                        `${name} ${((percent || 0) * 100).toFixed(1)}%`
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? '#10b981' : '#ef4444'}
                        />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Summary Section */}
      <motion.div {...fadeInUp}>
        <Card className='border-0 shadow-lg bg-white'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <DollarSign className='w-5 h-5 text-purple-600' />
              </div>
              <CardTitle className='text-xl font-semibold text-gray-900'>
                Resumen Financiero
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
              <div className='p-4 bg-emerald-50 rounded-lg'>
                <p className='text-sm text-gray-600 mb-2'>
                  Proporción de Ingresos
                </p>
                <p className='text-2xl font-bold text-emerald-600'>
                  {totalIncome && totalExpense
                    ? (
                        (totalIncome / (totalIncome + totalExpense)) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </p>
              </div>
              <div className='p-4 bg-red-50 rounded-lg'>
                <p className='text-sm text-gray-600 mb-2'>
                  Proporción de Egresos
                </p>
                <p className='text-2xl font-bold text-red-600'>
                  {totalIncome && totalExpense
                    ? (
                        (totalExpense / (totalIncome + totalExpense)) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </p>
              </div>
              <div className='p-4 bg-blue-50 rounded-lg'>
                <p className='text-sm text-gray-600 mb-2'>
                  Eficiencia Financiera
                </p>
                <p
                  className={`text-2xl font-bold ${
                    (balance || 0) >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {(balance || 0) >= 0 ? 'Positiva' : 'Negativa'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}