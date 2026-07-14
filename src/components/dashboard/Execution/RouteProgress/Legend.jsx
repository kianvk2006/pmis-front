export default function Legend() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="text-sm text-slate-600">اجرا شده</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-orange-500" />
        <span className="text-sm text-slate-600">در حال اجرا</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <span className="text-sm text-slate-600">جامانده</span>
      </div>
    </div>
  );
}
