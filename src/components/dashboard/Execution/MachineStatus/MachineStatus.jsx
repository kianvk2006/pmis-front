import { useCallback, useEffect, useMemo, useState } from "react";

import { getEquipmentRecords } from "@/data/repositories/projectRepository";

import MachineCard from "./MachineCard";

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function getMachineId(item) {
  return item?.equipmentId ?? item?.machineId ?? item?.id ?? null;
}

function getRecordTime(item) {
  const value =
    item?.submittedAt ??
    item?.reportDate ??
    item?.updatedAt ??
    item?.createdAt ??
    0;

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? 0 : time;
}

function getLatestMachines(records) {
  const machineMap = new Map();

  records.forEach((item) => {
    const machineId = getMachineId(item);

    if (!machineId) {
      return;
    }

    const currentRecord = machineMap.get(machineId);

    if (!currentRecord || getRecordTime(item) >= getRecordTime(currentRecord)) {
      machineMap.set(machineId, item);
    }
  });

  return Array.from(machineMap.values()).sort(
    (firstItem, secondItem) =>
      getRecordTime(secondItem) - getRecordTime(firstItem),
  );
}

export default function MachineStatus() {
  const [equipmentRecords, setEquipmentRecords] = useState([]);

  const loadData = useCallback(() => {
    try {
      const storedRecords = getEquipmentRecords();

      setEquipmentRecords(normalizeArray(storedRecords));
    } catch (error) {
      console.error("LOAD_EXECUTION_MACHINE_STATUS_ERROR", error);

      setEquipmentRecords([]);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleDataUpdated = () => {
      loadData();
    };

    window.addEventListener("pmis:data-updated", handleDataUpdated);

    return () => {
      window.removeEventListener("pmis:data-updated", handleDataUpdated);
    };
  }, [loadData]);

  const machines = useMemo(
    () => getLatestMachines(equipmentRecords),
    [equipmentRecords],
  );

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">وضعیت ماشین‌آلات</h2>

        <p className="mt-2 text-slate-500">
          آخرین وضعیت ثبت‌شده ماشین‌آلات پروژه از گزارش‌های کارگاه
        </p>
      </div>

      {machines.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            هنوز اطلاعات ماشین‌آلات ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            پس از ثبت تجهیزات در گزارش کارگاه، آخرین وضعیت آن‌ها در این بخش
            نمایش داده می‌شود.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {machines.map((machine) => (
            <MachineCard key={getMachineId(machine)} machine={machine} />
          ))}
        </div>
      )}
    </section>
  );
}
