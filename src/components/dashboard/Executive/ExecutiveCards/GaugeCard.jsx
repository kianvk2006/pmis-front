import GaugeChart from "./GaugeChart";

export default function GaugeCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-6
      shadow-sm
      "
    >
      <h3
        className="
        mb-6
        text-lg
        font-bold
        text-slate-700
        "
      >
        {title}
      </h3>

      <GaugeChart
        value={value}
        color={color}
      />
    </div>
  );
}