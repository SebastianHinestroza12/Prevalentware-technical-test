'use client';

import { useEffect, useState } from 'react';
import { DashboardCard } from '@/components/DashboardCard';
import { CARDS } from '@/constants';
import { DashboardLayout } from '@/components/DashboardLayout';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/useUser';
import { useUserStore } from '@/store/userStore';

export default function Home() {
  const { user, setUser } = useUserStore();
  const [userId, setUserId] = useState<string>();

  // Obtener la sesión solo si no hay user en el store
  useEffect(() => {
    const load = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user?.id) {
        setUserId(session.data.user.id);
      }
    };
    load();
  }, []);

  const query = useUser(userId);

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return (
    <DashboardLayout>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {CARDS.filter((card) =>
          card.roles.includes((user?.role.name as 'USER' | 'ADMIN') ?? '')
        ).map((card) => (
          <DashboardCard key={card.href} {...card} />
        ))}
      </div>
    </DashboardLayout>
  );
}
