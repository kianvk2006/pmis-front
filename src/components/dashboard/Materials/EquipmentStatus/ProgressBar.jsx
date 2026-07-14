export default function ProgressBar({ value }) {
  let color = "bg-green-500";

  if (value < 80) color = "bg-orange-500";

  if (value < 50) color = "bg-red-500";

  return (
    <div className="mt-3">
      <div className="mb-2 flex justify-between text-xs">
        <span>سلامت</span>

        <span>{value}%</span>
      </div>

      <div className="h-2 rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}
