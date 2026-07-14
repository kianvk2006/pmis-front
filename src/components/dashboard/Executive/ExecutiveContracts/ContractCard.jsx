export default function ContractCard({
  title,
  contractor,
  progress,
  amount,
  paid,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5 hover:shadow-md transition">

      <div className="flex justify-between">

        <div>

          <h4 className="font-bold text-slate-800">
            {title}
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            {contractor}
          </p>

        </div>

        <span className="font-bold text-orange-500">
          {progress}%
        </span>

      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-200">

        <div
          className="h-3 rounded-full bg-orange-500"
          style={{ width: `${progress}%` }}
        />

      </div>

      <div className="mt-5 flex justify-between text-sm">

        <span>
          مبلغ:
          <strong className="mr-2">{amount}</strong>
        </span>

        <span>
          پرداخت:
          <strong className="mr-2">{paid}</strong>
        </span>

      </div>

    </div>
  );
}