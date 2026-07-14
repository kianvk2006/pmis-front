import { useCallback, useEffect, useState } from "react";

import { KPIGrid } from "./KPI";
import { InventoryTable } from "./Inventory";
import { EquipmentStatus } from "./EquipmentStatus";
import { ConsumptionChart } from "./ConsumptionChart";

import {
  getMaterialConsumptions,
  getMaterialRequests,
  getEquipmentRecords,
} from "@/data/repositories/projectRepository";

export default function MaterialsDashboard() {
  const [materialConsumptions, setMaterialConsumptions] = useState([]);

  const [materialRequests, setMaterialRequests] = useState([]);

  const [equipmentRecords, setEquipmentRecords] = useState([]);

  /*
    LOAD MATERIALS DATA

    داده‌های ثبت‌شده توسط داشبورد کارگاه
    از Data Layer دریافت می‌شوند.
  */

  const loadMaterialsData = useCallback(() => {
    try {
      const consumptions = getMaterialConsumptions();

      const requests = getMaterialRequests();

      const equipment = getEquipmentRecords();

      setMaterialConsumptions(consumptions);

      setMaterialRequests(requests);

      setEquipmentRecords(equipment);
    } catch (error) {
      console.error("LOAD_MATERIALS_DASHBOARD_ERROR", error);

      setMaterialConsumptions([]);

      setMaterialRequests([]);

      setEquipmentRecords([]);
    }
  }, []);

  /*
    INITIAL LOAD
  */

  useEffect(() => {
    loadMaterialsData();
  }, [loadMaterialsData]);

  /*
    AUTO REFRESH

    بعد از Submit یا Update گزارش کارگاه،
    Repository این Event را Dispatch می‌کند.
  */

  useEffect(() => {
    const handleDataUpdated = () => {
      loadMaterialsData();
    };

    window.addEventListener("pmis:data-updated", handleDataUpdated);

    return () => {
      window.removeEventListener("pmis:data-updated", handleDataUpdated);
    };
  }, [loadMaterialsData]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">مصالح و تجهیزات</h1>

        <p className="mt-2 text-slate-500">
          مدیریت موجودی، تجهیزات و مصرف مصالح
        </p>
      </div>

      <KPIGrid
        materialConsumptions={materialConsumptions}
        materialRequests={materialRequests}
        equipmentRecords={equipmentRecords}
      />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="space-y-8 xl:col-span-8">
          <InventoryTable
            materialConsumptions={materialConsumptions}
            materialRequests={materialRequests}
          />

          <ConsumptionChart materialConsumptions={materialConsumptions} />
        </div>

        <div className="xl:col-span-4">
          <EquipmentStatus equipmentRecords={equipmentRecords} />
        </div>
      </div>
    </div>
  );
}
