import { useQuery } from '@tanstack/react-query';
import { UsersService } from '@/services/users.service';
import { User } from '@/interfaces';

export const useUser = (userId: string | undefined) =>
  useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) throw new Error('No userId provided');
      const response = await UsersService.getUserById(userId);
      return response.data;
    },
    enabled: !!userId, // solo se ejecuta si hay userId
    staleTime: 1000 * 60 * 30, // cache 30 min
  });
