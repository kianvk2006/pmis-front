const MAX_SHIFT_HOURS = 12;

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function clampPercent(value) {
  return Math.min(100, Math.max(0, value));
}

export default function MachineProgress({ value }) {
  const workHours = normalizeNumber(value);

  const percentage = clampPercent((workHours / MAX_SHIFT_HOURS) * 100);

  return (
    <div className="mt-5">
      <div className="mb-2 flex justify-between text-xs text-slate-500">
        <span>کارکرد شیفت</span>

        <span>
          {workHours.toLocaleString("fa-IR", {
            maximumFractionDigits: 2,
          })}{" "}
          ساعت
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-orange-500 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
