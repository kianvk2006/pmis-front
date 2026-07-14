import CostDonut from "./CostDonut";

export default function CostBreakdown() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-bold">ترکیب هزینه‌ها</h3>

      <CostDonut />
    </div>
  );
}
