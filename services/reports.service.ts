import { API_BASE, API_KEY } from '@/constants';

export class ReportsService {
  static async getSummary() {
    const res = await fetch(`${API_BASE}/reports/summary`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Error fetching reports summary');
    }

    return res.json();
  }

  static async exportCSV() {
    const res = await fetch(`${API_BASE}/reports/export`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!res.ok) {
      throw new Error('Error exporting report');
    }

    return res.blob();
  }
}
