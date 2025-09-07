import { useQuery } from '@tanstack/react-query';
import { UsersService } from '@/services/users.service';
import { User } from '@/interfaces/user';

export function useUser(userId: string | undefined) {
  return useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      const response = await UsersService.getUserById(userId);
      return response.data;
    },
    enabled: !!userId, // solo se ejecuta si hay userId
    staleTime: 1000 * 60 * 5, // cache 5 min
  });
}
