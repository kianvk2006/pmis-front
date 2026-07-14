import Sidebar from "@/components/layout/sidebar/Sidebar";
import SiteDashboardContent from "@/components/dashboard/Site/SiteDashboard";
import { SiteReportProvider } from "@/components/dashboard/Site/store";

export default function SiteDashboard() {
  return (
    <SiteReportProvider>
      <div className="flex h-screen bg-slate-100">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
          <SiteDashboardContent />
        </main>
      </div>
    </SiteReportProvider>
  );
}
