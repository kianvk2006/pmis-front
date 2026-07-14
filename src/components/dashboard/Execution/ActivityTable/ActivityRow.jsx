import StatusBadge from "./StatusBadge";

const ACTIVITY_CATALOG = {
  "ACT-001": "خاکبرداری",
  "ACT-002": "خاکریزی",
  "ACT-003": "اجرای زیرسازی",
  "ACT-004": "اجرای روسازی",
  "ACT-005": "ریل‌گذاری",
};

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function getActivityId(item) {
  return item?.activityId ?? item?.wbsId ?? item?.taskId ?? item?.id ?? null;
}

function getActivityName(item) {
  const activityId = getActivityId(item);

  return (
    item?.activityName ??
    item?.name ??
    item?.activity ??
    ACTIVITY_CATALOG[activityId] ??
    activityId ??
    "فعالیت نامشخص"
  );
}

function getQuantity(item) {
  return normalizeNumber(
    item?.quantity ??
      item?.actualQuantity ??
      item?.executedQuantity ??
      item?.workDone ??
      0,
  );
}

function getProgress(item) {
  const progress = normalizeNumber(
    item?.progressPercent ??
      item?.progress ??
      item?.actualProgress ??
      item?.percentage ??
      item?.percent ??
      0,
  );

  return Math.min(100, Math.max(0, progress));
}

function getReportDate(item) {
  return (
    item?.reportDate ??
    item?.submittedAt ??
    item?.updatedAt ??
    item?.createdAt ??
    null
  );
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("fa-IR");
}

function getStatus(item, progress) {
  if (progress >= 100) {
    return "completed";
  }

  if (progress > 0) {
    return "in-progress";
  }

  const status = String(item?.status ?? "")
    .trim()
    .toLowerCase();

  return status || "not-started";
}

export default function ActivityRow({ item }) {
  const progress = getProgress(item);

  const status = getStatus(item, progress);

  return (
    <tr className="border-b transition last:border-0 hover:bg-slate-50">
      <td className="px-5 py-4 font-medium text-slate-800">
        {getActivityName(item)}
      </td>

      <td className="px-5 py-4">
        {getQuantity(item).toLocaleString("fa-IR", {
          maximumFractionDigits: 2,
        })}
      </td>

      <td className="px-5 py-4">{item?.unit || "-"}</td>

      <td className="px-5 py-4">
        <div className="w-32">
          <div className="mb-2 flex justify-between text-xs">
            <span className="font-semibold text-slate-700">
              {progress.toLocaleString("fa-IR", {
                maximumFractionDigits: 1,
              })}
              ٪
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-orange-500 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </td>

      <td className="px-5 py-4 text-slate-600">
        {formatDate(getReportDate(item))}
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={status} />
      </td>
    </tr>
  );
}
