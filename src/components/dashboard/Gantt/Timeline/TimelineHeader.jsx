export default function TimelineHeader({ months = [] }) {
  return (
    <div
      className="
      flex
      h-12
      border-b
      border-slate-200
      bg-slate-50
      "
    >
      {months.map((month, index) => (
        <div
          key={index}
          className="
          flex
          min-w-[140px]
          items-center
          justify-center
          border-l
          border-slate-200
          text-sm
          font-bold
          text-slate-700
          "
        >
          {month.label}

          <span className="mr-1 text-xs">{month.year}</span>
        </div>
      ))}
    </div>
  );
}
