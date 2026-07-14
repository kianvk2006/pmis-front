import { useState } from "react";
import { Boxes } from "lucide-react";

import MaterialTabs from "./MaterialTabs";
import ConsumptionForm from "./ConsumptionForm";
import RequestForm from "./RequestForm";
import MaterialsSummary from "./MaterialsSummary";

import { useSiteReport } from "../store";

const MATERIAL_UNITS = {
  "MAT-001": "کیسه",
  "MAT-002": "تن",
  "MAT-003": "متر³",
  "MAT-004": "تن",
  "MAT-005": "متر",
};

function createId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
}

function createConsumptionItem() {
  return {
    id: createId(),

    materialId: "",

    activityId: "",

    quantity: "",

    location: "",

    unit: "",
  };
}

function createRequestItem() {
  return {
    id: createId(),

    materialId: "",

    quantity: "",

    requiredDate: "",

    priority: "normal",

    deliveryLocation: "",

    reason: "",
  };
}

export default function MaterialsForm() {
  const [activeTab, setActiveTab] = useState("consumption");

  const { report, setMaterialConsumptions, setMaterialRequests } =
    useSiteReport();

  const consumptionItems = Array.isArray(report?.materialConsumptions)
    ? report.materialConsumptions
    : [];

  const requestItems = Array.isArray(report?.materialRequests)
    ? report.materialRequests
    : [];

  /*
    CONSUMPTIONS
  */

  const addConsumption = () => {
    setMaterialConsumptions((currentItems) => [
      ...(Array.isArray(currentItems) ? currentItems : []),

      createConsumptionItem(),
    ]);
  };

  const updateConsumption = (index, field, value) => {
    setMaterialConsumptions((currentItems) => {
      const safeItems = Array.isArray(currentItems) ? currentItems : [];

      return safeItems.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        const updatedItem = {
          ...item,

          [field]: value,
        };

        if (field === "materialId") {
          updatedItem.unit = MATERIAL_UNITS[value] ?? "";
        }

        return updatedItem;
      });
    });
  };

  const removeConsumption = (index) => {
    setMaterialConsumptions((currentItems) => {
      const safeItems = Array.isArray(currentItems) ? currentItems : [];

      return safeItems.filter((_, itemIndex) => itemIndex !== index);
    });
  };

  /*
    REQUESTS
  */

  const addRequest = () => {
    setMaterialRequests((currentItems) => [
      ...(Array.isArray(currentItems) ? currentItems : []),

      createRequestItem(),
    ]);
  };

  const updateRequest = (index, field, value) => {
    setMaterialRequests((currentItems) => {
      const safeItems = Array.isArray(currentItems) ? currentItems : [];

      return safeItems.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,

              [field]: value,
            }
          : item,
      );
    });
  };

  const removeRequest = (index) => {
    setMaterialRequests((currentItems) => {
      const safeItems = Array.isArray(currentItems) ? currentItems : [];

      return safeItems.filter((_, itemIndex) => itemIndex !== index);
    });
  };

  const consumptionCount = consumptionItems.filter(
    (item) => item?.materialId,
  ).length;

  const requestCount = requestItems.filter((item) => item?.materialId).length;

  const hasItems = consumptionItems.length > 0 || requestItems.length > 0;

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <Boxes size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              ثبت مصالح پروژه
            </h2>

            <p className="mt-1 text-slate-500">
              ثبت مصرف واقعی مصالح و درخواست‌های جدید تأمین
            </p>
          </div>
        </div>

        <MaterialTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          consumptionCount={consumptionCount}
          requestCount={requestCount}
        />
      </div>

      {activeTab === "consumption" ? (
        <ConsumptionForm
          items={consumptionItems}
          onAdd={addConsumption}
          onChange={updateConsumption}
          onRemove={removeConsumption}
        />
      ) : (
        <RequestForm
          items={requestItems}
          onAdd={addRequest}
          onChange={updateRequest}
          onRemove={removeRequest}
        />
      )}

      {hasItems && (
        <div className="mt-6">
          <MaterialsSummary
            consumptionItems={consumptionItems}
            requestItems={requestItems}
          />
        </div>
      )}
    </section>
  );
}
