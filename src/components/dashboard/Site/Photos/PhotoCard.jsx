import { Clock3, MapPin, Trash2 } from "lucide-react";

const activityOptions = [
  {
    value: "",
    label: "بدون فعالیت مرتبط",
  },
  {
    value: "ACT-001",
    label: "ریل‌گذاری",
  },
  {
    value: "ACT-002",
    label: "خاکبرداری",
  },
  {
    value: "ACT-003",
    label: "زیرسازی",
  },
  {
    value: "ACT-004",
    label: "بتن‌ریزی",
  },
];

export default function PhotoCard({ item, index, onChange, onRemove }) {
  const updateField = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <img
          src={item.previewUrl}
          alt={item.title || item.fileName}
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-red-500 shadow-sm backdrop-blur transition hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>

        <div className="absolute bottom-3 right-3 rounded-lg bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
          {(item.fileSize / 1024 / 1024).toFixed(2)} MB
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            عنوان تصویر
          </label>

          <input
            type="text"
            value={item.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="مثلاً پیشرفت ریل‌گذاری قطعه ۲"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            فعالیت مرتبط
          </label>

          <select
            value={item.activityId}
            onChange={(event) => updateField("activityId", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            {activityOptions.map((activity) => (
              <option key={activity.value} value={activity.value}>
                {activity.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            موقعیت کیلومتری
          </label>

          <div className="relative">
            <input
              type="text"
              value={item.km}
              onChange={(event) => updateField("km", event.target.value)}
              placeholder="مثلاً 328+500"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 pr-10 outline-none transition focus:border-orange-500"
            />

            <MapPin
              size={17}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            توضیحات تصویر
          </label>

          <textarea
            rows={3}
            value={item.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="شرح وضعیت ثبت‌شده در تصویر..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Clock3 size={15} />

            <span>{new Date(item.capturedAt).toLocaleString("fa-IR")}</span>
          </div>

          <span
            className={
              item.uploadStatus === "uploaded"
                ? "font-semibold text-green-600"
                : item.uploadStatus === "uploading"
                  ? "font-semibold text-orange-600"
                  : item.uploadStatus === "error"
                    ? "font-semibold text-red-600"
                    : "font-semibold text-slate-500"
            }
          >
            {item.uploadStatus === "uploaded"
              ? "آپلود شده"
              : item.uploadStatus === "uploading"
                ? "در حال آپلود"
                : item.uploadStatus === "error"
                  ? "خطای آپلود"
                  : "در انتظار ارسال"}
          </span>
        </div>
      </div>
    </article>
  );
}
