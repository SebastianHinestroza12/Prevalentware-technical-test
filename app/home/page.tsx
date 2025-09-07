'use client';

import { DashboardCard } from '@/components/DashboardCard';
import { CARDS } from '@/constants';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function Home() {
  return (
    <DashboardLayout>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {CARDS.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </DashboardLayout>
  );
}