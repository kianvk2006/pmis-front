const levels = [
  {
    id: "day",
    label: "روز",
  },
  {
    id: "week",
    label: "هفته",
  },
  {
    id: "month",
    label: "ماه",
  },
];

export default function ZoomSelector({ zoom, setZoom }) {
  return (
    <div className="flex items-center gap-2">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => setZoom(level.id)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            zoom === level.id
              ? "bg-orange-500 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
