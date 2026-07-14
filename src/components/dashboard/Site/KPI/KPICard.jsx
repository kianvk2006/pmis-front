const colors = {
  blue: "border-blue-500 bg-blue-50",
  green: "border-green-500 bg-green-50",
  orange: "border-orange-500 bg-orange-50",
  red: "border-red-500 bg-red-50",
};

export default function KPICard({ item }) {
  return (
    <div
      className={`
      rounded-3xl
      border-r-4
      p-6
      shadow-sm
      ${colors[item.color]}
      `}
    >
      <p className="text-sm text-slate-500">{item.title}</p>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-4xl font-black">{item.value}</span>

        <span className="pb-1 text-slate-500">{item.unit}</span>
      </div>
    </div>
  );
}
