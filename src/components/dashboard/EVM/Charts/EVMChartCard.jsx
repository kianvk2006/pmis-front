export default function EVMChartCard({ children }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-bold">نمودار ارزش کسب‌شده</h3>

      {children}
    </div>
  );
}
