export default function GaugeHeader({ title }) {
  return (
    <div className="mb-4 flex items-center justify-between">

      <h3 className="font-bold text-slate-700">
        {title}
      </h3>

      <span
        className="
        h-3
        w-3
        rounded-full
        bg-orange-500
        "
      />

    </div>
  );
}