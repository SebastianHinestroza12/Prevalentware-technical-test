import { MovementsService } from "@/services/movements.service";
import { useQuery } from "@tanstack/react-query";

export const useUserMovements = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['userMovements', userId],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      return MovementsService.getUserMovements(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
};
