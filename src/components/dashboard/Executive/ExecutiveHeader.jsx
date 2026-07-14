import {
  CalendarDays,
  Download,
  Printer,
  RefreshCcw,
} from "lucide-react";

export default function ExecutiveHeader() {
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
      {/* عنوان */}
      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          داشبورد مدیریت اجرایی
        </h1>

        <p className="mt-2 text-slate-500">
          نمای جامع مدیریت پروژه قطار برقی گلبهار مشهد
        </p>

      </div>

      {/* اکشن‌ها */}
      <div className="flex items-center gap-3">

        <button
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
          transition
          hover:bg-slate-100
          "
        >
          <CalendarDays size={18} />
          این ماه
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
          bg-white
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
          bg-white
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