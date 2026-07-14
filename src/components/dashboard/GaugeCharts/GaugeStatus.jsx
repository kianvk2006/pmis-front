export default function GaugeStatus({ value }) {
  let text = "";
  let color = "";

  if (value >= 90) {
    text = "عالی";
    color = "text-green-600";
  } else if (value >= 70) {
    text = "خوب";
    color = "text-orange-500";
  } else {
    text = "نیازمند توجه";
    color = "text-red-500";
  }

  return (
    <div className="mt-5 flex items-center justify-center gap-2">
      <span className={`font-semibold ${color}`}>
        {text}
      </span>

      <span className="text-slate-400">
        وضعیت
      </span>
    </div>
  );
}