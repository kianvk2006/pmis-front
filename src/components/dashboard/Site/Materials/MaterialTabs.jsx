import { PackageMinus, ShoppingCart } from "lucide-react";

export default function MaterialTabs({
  activeTab,
  onChange,
  consumptionCount = 0,
  requestCount = 0,
}) {
  return (
    <div className="flex rounded-2xl bg-slate-100 p-1">
      <button
        type="button"
        onClick={() => onChange("consumption")}
        className={`
          flex
          items-center
          gap-2
          rounded-xl
          px-5
          py-3
          font-semibold
          transition
          ${
            activeTab === "consumption"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }
        `}
      >
        <PackageMinus size={18} />

        <span>مصرف مصالح</span>

        <span
          className={`
            flex
            h-6
            min-w-6
            items-center
            justify-center
            rounded-full
            px-1.5
            text-xs
            font-bold
            ${
              activeTab === "consumption"
                ? "bg-orange-50 text-orange-600"
                : "bg-slate-200 text-slate-500"
            }
          `}
        >
          {consumptionCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange("request")}
        className={`
          flex
          items-center
          gap-2
          rounded-xl
          px-5
          py-3
          font-semibold
          transition
          ${
            activeTab === "request"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }
        `}
      >
        <ShoppingCart size={18} />

        <span>درخواست مصالح</span>

        <span
          className={`
            flex
            h-6
            min-w-6
            items-center
            justify-center
            rounded-full
            px-1.5
            text-xs
            font-bold
            ${
              activeTab === "request"
                ? "bg-orange-50 text-orange-600"
                : "bg-slate-200 text-slate-500"
            }
          `}
        >
          {requestCount}
        </span>
      </button>
    </div>
  );
}
