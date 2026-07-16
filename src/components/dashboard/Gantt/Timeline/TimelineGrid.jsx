export default function TimelineGrid({ months = [], rowCount = 0 }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* خطوط عمودی ماه‌ها */}

      <div className="flex h-full">
        {months.map((month, index) => (
          <div key={index} className="w-[140px] border-l border-slate-200" />
        ))}
      </div>

      {/* خطوط افقی فعالیت‌ها */}

      <div className="absolute inset-0">
        {Array.from({
          length: rowCount,
        }).map((_, index) => (
          <div
            key={index}
            className="border-b border-slate-100"
            style={{
              height: 52,
            }}
          />
        ))}
      </div>
    </div>
  );
}
