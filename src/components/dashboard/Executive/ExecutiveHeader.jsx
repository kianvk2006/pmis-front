import { CalendarDays, Download, Printer, RefreshCcw } from "lucide-react";

import { useEffect, useState } from "react";

import { getExecutiveDashboardData } from "@/services/executiveDashboardService";

export default function ExecutiveHeader() {
  const [dashboard, setDashboard] = useState(null);

  const loadDashboard = () => {
    setDashboard(getExecutiveDashboardData());
  };

  useEffect(() => {
    loadDashboard();

    window.addEventListener("pmis:data-updated", loadDashboard);

    return () => {
      window.removeEventListener("pmis:data-updated", loadDashboard);
    };
  }, []);

  return (
    <header
      className="
      flex
      items-center
      justify-between
      rounded-3xl
      bg-white
      p-6
      shadow-sm
      "
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          داشبورد مدیریت اجرایی
        </h1>

        <p className="mt-2 text-slate-500">
          {dashboard?.project?.name ?? "سامانه مدیریت پروژه"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="
          flex
          h-11
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          "
        >
          <CalendarDays size={18} />
          این ماه
        </div>

        <button
          onClick={loadDashboard}
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          transition
          hover:bg-slate-100
          "
        >
          <RefreshCcw size={18} />
        </button>

        <button
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          transition
          hover:bg-slate-100
          "
        >
          <Printer size={18} />
        </button>

        <button
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-orange-500
          text-white
          transition
          hover:bg-orange-600
          "
        >
          <Download size={18} />
        </button>
      </div>
    </header>
  );
}
