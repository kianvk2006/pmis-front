export default function UserMenu() {
  return (
    <button
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-slate-100
        px-3
        py-2
        transition-all
        hover:bg-slate-200
      "
    >
      <div className="h-10 w-10 rounded-full bg-orange-500" />

      <div className="text-right">
        <p className="text-sm font-bold">
          مدیر پروژه
        </p>

        <p className="text-xs text-slate-500">
          Administrator
        </p>
      </div>
    </button>
  );
}