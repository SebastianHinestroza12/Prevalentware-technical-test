'use client';

import { Logo } from '@/components/Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t border-gray-200 bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-3'>
            <Logo />
            <span className='text-sm text-gray-500'>
              © {currentYear} FinanzasYA. Todos los derechos reservados.
            </span>
          </div>
          <div className='text-sm text-gray-600'>
            Desarrollado por{' '}
            <span className='font-semibold text-gray-900'>Sebastian Mena</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
