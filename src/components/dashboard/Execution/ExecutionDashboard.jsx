import { KPIGrid } from "./KPI";
import { RouteProgress } from "./RouteProgress";
import { MachineStatus } from "./MachineStatus";
import { ActivityTable } from "./ActivityTable";

export default function ExecutionDashboard() {
  return (
    <div className="space-y-8">
      <KPIGrid />

      <RouteProgress />

      <MachineStatus />

      <ActivityTable />
    </div>
  );
}
