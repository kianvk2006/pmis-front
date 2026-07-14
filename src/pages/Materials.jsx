import Sidebar from "@/components/layout/sidebar/Sidebar";
import MaterialsDashboard from "@/components/dashboard/Materials/MaterialsDashboard";

export default function Materials() {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <MaterialsDashboard />
      </main>
    </div>
  );
}
