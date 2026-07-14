import KPICard from "./KPICard";
import { siteKPI } from "@/mocks/dashboard/site/siteKPI";

export default function KPIGrid() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {siteKPI.map((item) => (
        <KPICard key={item.id} item={item} />
      ))}
    </div>
  );
}
