import { useMemo } from "react";

import InventoryRow from "./InventoryRow";

const materialCatalog = {
  "MAT-001": {
    name: "سیمان",
    unit: "کیسه",
  },

  "MAT-002": {
    name: "آرماتور",
    unit: "تن",
  },

  "MAT-003": {
    name: "بتن آماده",
    unit: "متر³",
  },

  "MAT-004": {
    name: "شن و ماسه",
    unit: "تن",
  },

  "MAT-005": {
    name: "ریل",
    unit: "متر",
  },
};

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeQuantity(value) {
  const quantity = Number(value);

  return Number.isFinite(quantity) ? quantity : 0;
}

function getMaterialInfo(materialId, item) {
  const catalogItem = materialCatalog[materialId];

  return {
    name:
      item?.materialName ??
      item?.name ??
      catalogItem?.name ??
      materialId ??
      "مصالح نامشخص",

    unit: item?.unit ?? catalogItem?.unit ?? "-",
  };
}

function calculateStatus({ consumed, requested }) {
  if (requested > 0 && consumed > 0) {
    return "در انتظار تأمین";
  }

  if (requested > 0) {
    return "درخواست تأمین";
  }

  if (consumed > 0) {
    return "مصرف ثبت‌شده";
  }

  return "بدون عملیات";
}

export default function InventoryTable({
  materialConsumptions = [],
  materialRequests = [],
}) {
  const inventoryItems = useMemo(() => {
    const consumptions = normalizeArray(materialConsumptions);

    const requests = normalizeArray(materialRequests);

    const materialMap = new Map();

    /*
      CONSUMPTIONS
    */

    consumptions.forEach((item) => {
      if (!item?.materialId) {
        return;
      }

      const materialInfo = getMaterialInfo(item.materialId, item);

      const current = materialMap.get(item.materialId) ?? {
        id: item.materialId,

        name: materialInfo.name,

        unit: materialInfo.unit,

        consumed: 0,

        requested: 0,
      };

      current.consumed += normalizeQuantity(item.quantity);

      /*
        اگر واحد در رکورد واقعی وجود داشته باشد
        نسبت به Catalog اولویت دارد.
      */

      if (item.unit) {
        current.unit = item.unit;
      }

      materialMap.set(item.materialId, current);
    });

    /*
      REQUESTS
    */

    requests.forEach((item) => {
      if (!item?.materialId) {
        return;
      }

      const materialInfo = getMaterialInfo(item.materialId, item);

      const current = materialMap.get(item.materialId) ?? {
        id: item.materialId,

        name: materialInfo.name,

        unit: materialInfo.unit,

        consumed: 0,

        requested: 0,
      };

      current.requested += normalizeQuantity(item.quantity);

      if (item.unit) {
        current.unit = item.unit;
      }

      materialMap.set(item.materialId, current);
    });

    return Array.from(materialMap.values())
      .map((item) => {
        const netNeed = item.requested - item.consumed;

        return {
          ...item,

          netNeed,

          status: calculateStatus({
            consumed: item.consumed,

            requested: item.requested,
          }),
        };
      })
      .sort((firstItem, secondItem) => {
        /*
          مصالح دارای درخواست تأمین
          بالاتر نمایش داده می‌شوند.
        */

        if (secondItem.requested !== firstItem.requested) {
          return secondItem.requested - firstItem.requested;
        }

        return secondItem.consumed - firstItem.consumed;
      });
  }, [materialConsumptions, materialRequests]);

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">وضعیت مصالح پروژه</h2>

        <p className="mt-2 text-slate-500">
          خلاصه مصرف ثبت‌شده و درخواست‌های تأمین مصالح
        </p>
      </div>

      {inventoryItems.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            هنوز اطلاعات مصالحی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            اطلاعات مصرف و درخواست تأمین پس از ثبت گزارش کارگاه در این بخش نمایش
            داده می‌شود.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-right">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-5 py-4">نام مصالح</th>

                <th className="px-5 py-4">واحد</th>

                <th className="px-5 py-4">مصرف ثبت‌شده</th>

                <th className="px-5 py-4">درخواست تأمین</th>

                <th className="px-5 py-4">خالص نیاز</th>

                <th className="px-5 py-4">وضعیت</th>
              </tr>
            </thead>

            <tbody>
              {inventoryItems.map((item) => (
                <InventoryRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
