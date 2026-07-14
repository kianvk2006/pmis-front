import DashboardLayout from "@/components/dashboard/DashboardLayout/DashboardLayout";
import EVMDashboard from "@/components/dashboard/EVM";

export default function EVM() {
  return (
    <DashboardLayout>
      <EVMDashboard />
    </DashboardLayout>
  );
}