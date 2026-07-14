import { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FileClock, Plus, RefreshCw } from "lucide-react";

import { getSiteReports } from "@/data/repositories/projectRepository";

import ReportCard from "./ReportCard";
import EmptyReports from "./EmptyReports";

export default function ReportsList() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);

  /*
    دریافت گزارش‌های ثبت‌شده
    از Data Layer
  */

  const loadReports = useCallback(() => {
    try {
      const storedReports = getSiteReports();

      /*
        جدیدترین گزارش‌ها
        بالاتر نمایش داده می‌شوند.
      */

      const sortedReports = [...storedReports].sort(
        (firstReport, secondReport) => {
          const firstDate = new Date(
            firstReport.updatedAt ??
              firstReport.submittedAt ??
              firstReport.createdAt ??
              0,
          ).getTime();

          const secondDate = new Date(
            secondReport.updatedAt ??
              secondReport.submittedAt ??
              secondReport.createdAt ??
              0,
          ).getTime();

          return secondDate - firstDate;
        },
      );

      setReports(sortedReports);
    } catch (error) {
      console.error("LOAD_SITE_REPORTS_ERROR", error);

      setReports([]);
    }
  }, []);

  /*
    دریافت گزارش‌ها هنگام باز شدن صفحه
  */

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  /*
    Refresh خودکار لیست بعد از تغییر Data Layer

    projectRepository هنگام Submit / Update
    این Event را Dispatch می‌کند.
  */

  useEffect(() => {
    const handleDataUpdated = () => {
      loadReports();
    };

    window.addEventListener("pmis:data-updated", handleDataUpdated);

    return () => {
      window.removeEventListener("pmis:data-updated", handleDataUpdated);
    };
  }, [loadReports]);

  /*
    EDIT REPORT

    شناسه گزارش را داخل Query Parameter
    قرار می‌دهیم.

    EditReportLoader داخل داشبورد کارگاه
    گزارش را از Repository دریافت می‌کند.
  */

  const handleEdit = (report) => {
    navigate(`/dashboard/site?editReport=${encodeURIComponent(report.id)}`);
  };

  /*
    NEW REPORT

    بدون editReport وارد داشبورد کارگاه
    می‌شویم.
  */

  const handleNewReport = () => {
    navigate("/dashboard/site");
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <FileClock size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              گزارش‌های کارگاه
            </h1>

            <p className="mt-1 text-slate-500">
              مشاهده و ویرایش گزارش‌های ثبت‌شده کارگاه
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={loadReports}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              font-semibold
              text-slate-600
              transition
              hover:bg-slate-50
            "
          >
            <RefreshCw size={18} />
            بروزرسانی لیست
          </button>

          <button
            type="button"
            onClick={handleNewReport}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-orange-500
              px-4
              py-3
              font-semibold
              text-white
              transition
              hover:bg-orange-600
            "
          >
            <Plus size={18} />
            گزارش جدید
          </button>
        </div>
      </div>

      {reports.length === 0 ? (
        <EmptyReports />
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </section>
  );
}
