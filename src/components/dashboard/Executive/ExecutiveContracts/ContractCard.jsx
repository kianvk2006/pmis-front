export default function ContractCard({
  title,
  contractor,
  progress = 0,
  amount = "",
  paid = "",
}) {
  const safeProgress = Math.max(0, Math.min(Number(progress) || 0, 100));

  return (
    <div className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <h4 className="font-bold text-slate-800">{title}</h4>

          <p className="mt-1 text-sm text-slate-500">{contractor}</p>
        </div>

        <span className="font-bold text-orange-500">{safeProgress}%</span>
      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-200">
        <div
          className="h-3 rounded-full bg-orange-500 transition-all"
          style={{
            width: `${safeProgress}%`,
          }}
        />
      </div>

      <div className="mt-5 flex justify-between text-sm">
        <span>
          بودجه:
          <strong className="mr-2">{amount || "-"}</strong>
        </span>

        <span>
          هزینه:
          <strong className="mr-2">{paid || "-"}</strong>
        </span>
      </div>
    </div>
  );
}
