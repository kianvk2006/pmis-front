import {
  Download,
  Share2,
  Filter,
} from "lucide-react";

import ToolbarButton from "./ToolbarButton";

export default function HeroToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">

      <ToolbarButton
        icon={Filter}
        label="فیلتر"
      />

      <ToolbarButton
        icon={Download}
        label="خروجی"
      />

      <ToolbarButton
        icon={Share2}
        label="اشتراک‌گذاری"
        variant="primary"
      />

    </div>
  );
}