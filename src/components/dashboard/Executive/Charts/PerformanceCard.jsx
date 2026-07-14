export default function PerformanceCard({
  title,
  children,
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
      <div className="mb-6">

        <h3 className="text-lg font-bold text-slate-800">
          {title}
        </h3>

      </div>

      {children}

    </div>
  );
}