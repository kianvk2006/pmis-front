import ZoomSelector from "./ZoomSelector";

export default function GanttHeader({ zoom, setZoom }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          برنامه زمان‌بندی پروژه
        </h2>

        <p className="mt-2 text-sm text-slate-500">Gantt Chart</p>
      </div>

      <ZoomSelector zoom={zoom} setZoom={setZoom} />
    </div>
  );
}
