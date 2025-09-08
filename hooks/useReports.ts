'use client';

import { useQuery } from '@tanstack/react-query';
import { ReportsService } from '@/services/reports.service';

export function useReports() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: ReportsService.getSummary,
  });
}
