import { ReportsService } from "@/services/reports.service";

export async function downloadCSV() {
  try {
    const blob = await ReportsService.exportCSV();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('❌ Error downloading CSV:', error);
  }
}
