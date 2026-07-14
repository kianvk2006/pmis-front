import { Save } from "lucide-react";

export default function SaveProgressButton({ onClick, disabled = false }) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-orange-500
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-orange-600
          disabled:cursor-not-allowed
          disabled:bg-slate-300
        "
      >
        <Save size={18} />
        ثبت پیشرفت عملیات
      </button>
    </div>
  );
}
