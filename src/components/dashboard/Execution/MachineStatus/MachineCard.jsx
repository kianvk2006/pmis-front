import { Clock3, Truck, User } from "lucide-react";

import MachineProgress from "./MachineProgress";

const EQUIPMENT_CATALOG = {
  "EQ-001": "بیل مکانیکی",
  "EQ-002": "لودر",
  "EQ-003": "بولدوزر",
  "EQ-004": "گریدر",
  "EQ-005": "غلتک",
};

const STATUS_CONFIG = {
  active: {
    label: "فعال",
    className: "bg-green-100 text-green-700",
  },

  working: {
    label: "فعال",
    className: "bg-green-100 text-green-700",
  },

  operational: {
    label: "فعال",
    className: "bg-green-100 text-green-700",
  },

  فعال: {
    label: "فعال",
    className: "bg-green-100 text-green-700",
  },

  service: {
    label: "سرویس",
    className: "bg-orange-100 text-orange-700",
  },

  maintenance: {
    label: "سرویس",
    className: "bg-orange-100 text-orange-700",
  },

  سرویس: {
    label: "سرویس",
    className: "bg-orange-100 text-orange-700",
  },

  stopped: {
    label: "توقف",
    className: "bg-red-100 text-red-700",
  },

  inactive: {
    label: "توقف",
    className: "bg-red-100 text-red-700",
  },

  broken: {
    label: "خراب",
    className: "bg-red-100 text-red-700",
  },

  توقف: {
    label: "توقف",
    className: "bg-red-100 text-red-700",
  },

  خراب: {
    label: "خراب",
    className: "bg-red-100 text-red-700",
  },
};

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function getMachineId(item) {
  return item?.equipmentId ?? item?.machineId ?? item?.id ?? null;
}

function getMachineName(item) {
  const machineId = getMachineId(item);

  return (
    item?.equipmentName ??
    item?.machineName ??
    item?.name ??
    EQUIPMENT_CATALOG[machineId] ??
    machineId ??
    "ماشین‌آلات نامشخص"
  );
}

function getOperator(item) {
  return (
    item?.operatorName ??
    item?.operator ??
    item?.driverName ??
    item?.driver ??
    "-"
  );
}

function getWorkHours(item) {
  return normalizeNumber(
    item?.workHours ??
      item?.workingHours ??
      item?.hours ??
      item?.operationHours ??
      0,
  );
}

function getStatusConfig(value) {
  const normalizedStatus = String(value ?? "")
    .trim()
    .toLowerCase();

  return (
    STATUS_CONFIG[normalizedStatus] ?? {
      label: value || "نامشخص",
      className: "bg-slate-100 text-slate-600",
    }
  );
}

export default function MachineCard({ machine }) {
  const machineName = getMachineName(machine);

  const operator = getOperator(machine);

  const workHours = getWorkHours(machine);

  const status = getStatusConfig(machine?.status);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
          <Truck size={24} className="text-orange-500" />
        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${status.className}
          `}
        >
          {status.label}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">{machineName}</h3>

      <div className="mt-3 flex items-center gap-2 text-slate-500">
        <User size={15} />

        <span className="text-sm">{operator}</span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-slate-500">
        <Clock3 size={15} />

        <span className="text-sm">
          ساعات کارکرد:{" "}
          <strong className="text-slate-700">
            {workHours.toLocaleString("fa-IR", {
              maximumFractionDigits: 2,
            })}
          </strong>
        </span>
      </div>

      <MachineProgress value={workHours} />
    </div>
  );
}
