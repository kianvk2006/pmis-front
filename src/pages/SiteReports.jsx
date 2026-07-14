import Sidebar from "@/components/layout/sidebar/Sidebar";
import ReportsDashboard from "@/components/dashboard/Site/Reports/ReportsDashboard";
import { SiteReportProvider } from "@/components/dashboard/Site/store";

export default function SiteReports() {
  return (
    <SiteReportProvider>
      <div className="flex h-screen bg-slate-100">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
          <ReportsDashboard />
        </main>
      </div>
    </SiteReportProvider>
  );
}
