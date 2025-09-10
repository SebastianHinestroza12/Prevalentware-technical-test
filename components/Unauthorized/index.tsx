/* eslint-disable react/prop-types */
'use client';

interface UnauthorizedProps {
  message?: string;
}

export const Unauthorized: React.FC<UnauthorizedProps> = ({ message }) => (
  <div className='flex h-screen w-full flex-col items-center justify-center text-center'>
    <h1 className='text-6xl font-bold text-red-500'>403</h1>
    <p className='mt-4 text-xl'>
      {message ?? 'No autorizado para este recurso.'}
    </p>
  </div>
);
