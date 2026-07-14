export default function SCurveLegend() {
  const items = [
    {
      title: "برنامه‌ریزی شده",
      color: "#2563EB",
    },
    {
      title: "واقعی",
      color: "#16A34A",
    },
    {
      title: "پیش‌بینی",
      color: "#F97316",
    },
  ];

  return (
    <div className="mt-6 flex items-center justify-center gap-8">

      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-2"
        >
          <span
            className="h-3 w-3 rounded-full"
            style={{
              backgroundColor: item.color,
            }}
          />

          <span className="text-sm text-slate-600">
            {item.title}
          </span>
        </div>
      ))}

    </div>
  );
}