export default function DonutLegend({ data }) {
  return (
    <div className="mt-6 space-y-3">

      {data.map((item) => (

        <div
          key={item.name}
          className="flex items-center justify-between"
        >

          <div className="flex items-center gap-3">

            <span
              className="h-3 w-3 rounded-full"
              style={{
                background: item.color,
              }}
            />

            <span className="text-sm text-slate-600">
              {item.name}
            </span>

          </div>

          <span className="font-semibold">
            {item.value}%
          </span>

        </div>

      ))}

    </div>
  );
}