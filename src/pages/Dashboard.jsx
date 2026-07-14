import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SummaryCards from "@/components/dashboard/SummaryCards";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <SummaryCards />

      <DashboardContent />

    </DashboardLayout>
  );
}