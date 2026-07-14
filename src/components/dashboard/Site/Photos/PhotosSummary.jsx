export default function PhotosSummary({ items }) {
  const totalPhotos = items.length;

  const photosWithActivity = items.filter((item) => item.activityId).length;

  const photosWithLocation = items.filter((item) => item.km.trim()).length;

  const pendingPhotos = items.filter(
    (item) => item.uploadStatus === "pending",
  ).length;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-blue-50 p-5">
        <p className="text-sm text-slate-500">تصاویر ثبت‌شده</p>

        <p className="mt-2 text-3xl font-black text-blue-600">{totalPhotos}</p>
      </div>

      <div className="rounded-2xl bg-green-50 p-5">
        <p className="text-sm text-slate-500">دارای فعالیت مرتبط</p>

        <p className="mt-2 text-3xl font-black text-green-600">
          {photosWithActivity}
        </p>
      </div>

      <div className="rounded-2xl bg-orange-50 p-5">
        <p className="text-sm text-slate-500">دارای موقعیت کیلومتری</p>

        <p className="mt-2 text-3xl font-black text-orange-600">
          {photosWithLocation}
        </p>
      </div>

      <div className="rounded-2xl bg-slate-100 p-5">
        <p className="text-sm text-slate-500">در انتظار ارسال</p>

        <p className="mt-2 text-3xl font-black text-slate-700">
          {pendingPhotos}
        </p>
      </div>
    </div>
  );
}
