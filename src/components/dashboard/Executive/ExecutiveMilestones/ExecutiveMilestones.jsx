import { useEffect, useState } from "react";

import MilestoneItem from "./MilestoneItem";

import { getExecutiveMilestones } from "@/services/executiveDashboardService";

export default function ExecutiveMilestones() {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    setMilestones(getExecutiveMilestones());
  }, []);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-8 text-xl font-bold">نقاط عطف پروژه</h3>

      <div>
        {milestones.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
            هیچ نقطه عطفی تعریف نشده است.
          </div>
        ) : (
          milestones.map((item) => <MilestoneItem key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
}
