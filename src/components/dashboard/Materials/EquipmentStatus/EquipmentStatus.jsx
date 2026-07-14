import { useMemo } from "react";

import EquipmentRow from "./EquipmentRow";

const equipmentCatalog = {
  "EQ-001": {
    name: "بیل مکانیکی",
  },

  "EQ-002": {
    name: "لودر",
  },

  "EQ-003": {
    name: "بولدوزر",
  },

  "EQ-004": {
    name: "غلتک",
  },

  "EQ-005": {
    name: "جرثقیل",
  },
};

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeHours(item) {
  const value = item.workHours ?? item.hours ?? item.operatingHours ?? 0;

  const hours = Number(value);

  return Number.isFinite(hours) ? hours : 0;
}

function normalizeStatus(status) {
  return String(status ?? "")
    .trim()
    .toLowerCase();
}

function getStatusPriority(status) {
  const normalizedStatus = normalizeStatus(status);

  const priorities = {
    broken: 100,

    "out-of-service": 95,
    out_of_service: 95,

    repair: 90,

    maintenance: 80,
    service: 80,

    inactive: 60,

    active: 20,
    working: 20,
    operational: 20,
  };

  return priorities[normalizedStatus] ?? 0;
}

function selectImportantStatus(currentStatus, nextStatus) {
  if (!currentStatus) {
    return nextStatus;
  }

  if (!nextStatus) {
    return currentStatus;
  }

  return getStatusPriority(nextStatus) > getStatusPriority(currentStatus)
    ? nextStatus
    : currentStatus;
}

function getEquipmentName(equipmentId, item) {
  return (
    item?.equipmentName ??
    item?.name ??
    equipmentCatalog[equipmentId]?.name ??
    equipmentId ??
    "تجهیز نامشخص"
  );
}

export default function EquipmentStatus({ equipmentRecords = [] }) {
  const equipmentItems = useMemo(() => {
    const records = normalizeArray(equipmentRecords);

    const equipmentMap = new Map();

    records.forEach((item) => {
      const equipmentId = item?.equipmentId ?? item?.machineId ?? item?.id;

      if (!equipmentId) {
        return;
      }

      const current = equipmentMap.get(equipmentId) ?? {
        id: equipmentId,

        code: equipmentId,

        name: getEquipmentName(equipmentId, item),

        status: "",

        hours: 0,

        recordCount: 0,
      };

      current.hours += normalizeHours(item);

      current.recordCount += 1;

      current.status = selectImportantStatus(current.status, item.status);

      equipmentMap.set(equipmentId, current);
    });

    return Array.from(equipmentMap.values()).sort((firstItem, secondItem) => {
      const statusDifference =
        getStatusPriority(secondItem.status) -
        getStatusPriority(firstItem.status);

      if (statusDifference !== 0) {
        return statusDifference;
      }

      return secondItem.hours - firstItem.hours;
    });
  }, [equipmentRecords]);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">وضعیت تجهیزات</h2>

      <p className="mb-6 mt-2 text-slate-500">
        خلاصه تجهیزات ثبت‌شده در گزارش‌های کارگاه
      </p>

      {equipmentItems.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
          <p className="font-bold text-slate-700">
            هنوز اطلاعات تجهیزاتی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            پس از ثبت تجهیزات در گزارش کارگاه، وضعیت آن‌ها در این بخش نمایش داده
            می‌شود.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {equipmentItems.map((item) => (
            <EquipmentRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
