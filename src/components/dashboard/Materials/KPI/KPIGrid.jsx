import { useMemo } from "react";

import KPICard from "./KPICard";

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeStatus(status) {
  return String(status ?? "")
    .trim()
    .toLowerCase();
}

export default function KPIGrid({
  materialConsumptions = [],
  materialRequests = [],
  equipmentRecords = [],
}) {
  const kpiItems = useMemo(() => {
    const consumptions = normalizeArray(materialConsumptions);

    const requests = normalizeArray(materialRequests);

    const equipment = normalizeArray(equipmentRecords);

    /*
      تعداد رکوردهای مصرف مصالح

      فعلاً تعداد عملیات مصرف ثبت‌شده
      نمایش داده می‌شود.

      بعداً Inventory Layer را می‌سازیم
      و KPI موجودی واقعی انبار را
      از Stock محاسبه می‌کنیم.
    */

    const consumptionCount = consumptions.length;

    /*
      درخواست‌های باز

      چون RequestForm فعلی ممکن است
      هنوز status نداشته باشد،
      درخواست بدون status نیز Open
      در نظر گرفته می‌شود.
    */

    const openRequests = requests.filter((request) => {
      const status = normalizeStatus(request.status);

      return (
        !status ||
        status === "pending" ||
        status === "requested" ||
        status === "open"
      );
    });

    /*
      تجهیزات فعال

      Statusهای رایج فعال را
      پشتیبانی می‌کنیم.
    */

    const activeEquipment = equipment.filter((item) => {
      const status = normalizeStatus(item.status);

      return (
        status === "active" ||
        status === "working" ||
        status === "operational" ||
        status === "in-use" ||
        status === "in_use"
      );
    });

    /*
      تجهیزات دارای مشکل

      EquipmentForm فعلی ممکن است
      statusهای مختلف داشته باشد.

      بنابراین چند حالت رایج
      پشتیبانی می‌شود.
    */

    const problematicEquipment = equipment.filter((item) => {
      const status = normalizeStatus(item.status);

      return (
        status === "broken" ||
        status === "maintenance" ||
        status === "repair" ||
        status === "inactive" ||
        status === "out-of-service" ||
        status === "out_of_service"
      );
    });

    return [
      {
        id: "material-consumptions",

        title: "مصرف‌های ثبت‌شده",

        value: consumptionCount,

        subtitle: "رکورد مصرف مصالح",

        icon: "package",

        color: "blue",
      },

      {
        id: "open-material-requests",

        title: "درخواست‌های تأمین",

        value: openRequests.length,

        subtitle: "درخواست در انتظار تأمین",

        icon: "alert",

        color: "red",
      },

      {
        id: "active-equipment",

        title: "تجهیزات فعال",

        value: activeEquipment.length,

        subtitle: "تجهیزات در حال کار",

        icon: "check",

        color: "green",
      },

      {
        id: "problematic-equipment",

        title: "تجهیزات نیازمند رسیدگی",

        value: problematicEquipment.length,

        subtitle: "خرابی یا تعمیرات",

        icon: "truck",

        color: "orange",
      },
    ];
  }, [materialConsumptions, materialRequests, equipmentRecords]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {kpiItems.map((item) => (
        <KPICard key={item.id} item={item} />
      ))}
    </div>
  );
}
