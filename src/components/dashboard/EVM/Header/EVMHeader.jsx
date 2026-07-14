import { useCallback, useEffect, useState } from "react";

import { CalendarDays, Download, Printer, RefreshCcw } from "lucide-react";

import { getEVMData } from "@/data/evm/evmRepository";

function formatDate(value) {
  if (!value) {
    return "بدون تاریخ داده";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function createDownloadFile(data) {
  const content = JSON.stringify(data, null, 2);

  const blob = new Blob([content], {
    type: "application/json;charset=utf-8",
  });

  return URL.createObjectURL(blob);
}

export default function EVMHeader() {
  const [evmData, setEVMData] = useState(null);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(() => {
    try {
      const data = getEVMData();

      setEVMData(data);
    } catch (error) {
      console.error("LOAD_EVM_HEADER_ERROR", error);

      setEVMData(null);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleDataUpdated = () => {
      loadData();
    };

    window.addEventListener("pmis:data-updated", handleDataUpdated);

    return () => {
      window.removeEventListener("pmis:data-updated", handleDataUpdated);
    };
  }, [loadData]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    try {
      loadData();
    } finally {
      window.setTimeout(() => {
        setIsRefreshing(false);
      }, 400);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!evmData) {
      return;
    }

    const downloadUrl = createDownloadFile(evmData);

    const anchor = document.createElement("a");

    anchor.href = downloadUrl;

    anchor.download = `evm-report-${
      evmData?.dataDate || new Date().toISOString().slice(0, 10)
    }.json`;

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    URL.revokeObjectURL(downloadUrl);
  };

  const dataDate =
    evmData?.dataDate ?? evmData?.reportDate ?? evmData?.date ?? null;

  return (
    <header className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          داشبورد تحلیل ارزش کسب‌شده (EVM)
        </h1>

        <p className="mt-2 text-slate-500">Earned Value Management Dashboard</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600">
          <CalendarDays size={18} />

          <span>تاریخ داده:</span>

          <strong className="text-slate-800">{formatDate(dataDate)}</strong>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="بروزرسانی اطلاعات"
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
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <RefreshCcw
            size={18}
            className={isRefreshing ? "animate-spin" : ""}
          />
        </button>

        <button
          type="button"
          onClick={handlePrint}
          title="چاپ داشبورد"
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
          type="button"
          onClick={handleDownload}
          disabled={!evmData}
          title="دریافت خروجی EVM"
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
            disabled:cursor-not-allowed
            disabled:bg-slate-300
          "
        >
          <Download size={18} />
        </button>
      </div>
    </header>
  );
}
