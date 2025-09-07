'use client';

import { ReactNode } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getColorClasses, type ColorVariant } from '@/utils/colorClasses';

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  color?: ColorVariant;
}

export const DashboardCard = ({
  title,
  description,
  href,
  icon,
  color = 'emerald',
}: DashboardCardProps) => {
  const colorClasses = getColorClasses(color);

  console.log(colorClasses);

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 border-2 ${colorClasses.borderColor} cursor-pointer flex flex-col`}
    >
      <Link href={href} className='flex-1 flex flex-col'>
        <CardHeader className='pb-4'>
          <div className='flex items-center gap-3 mb-2'>
            <div
              className={`p-3 ${colorClasses.bgColor} rounded-lg transition-colors`}
            >
              {icon}
            </div>
          </div>
          <CardTitle
            className={`text-xl font-bold ${colorClasses.textColor} transition-colors`}
          >
            {title}
          </CardTitle>
          <CardDescription className='text-gray-600'>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className='mt-auto'>
          <Button className={`w-full ${colorClasses.buttonColor} text-white`}>
            Acceder
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};
