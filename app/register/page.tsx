'use client';

import { RegisterForm } from '@/components/Auth/RegisterForm';
import { Logo } from '@/components/Logo';

export default function RegisterPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Logo />
        <RegisterForm className='max-w-md w-full' />
      </div>
    </div>
  );
}
