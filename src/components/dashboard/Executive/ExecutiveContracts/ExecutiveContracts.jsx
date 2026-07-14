import { useEffect, useState } from "react";
import ContractCard from "./ContractCard";

import { getExecutiveContracts } from "@/services/executiveDashboardService";

export default function ExecutiveContracts() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    setContracts(getExecutiveContracts());
  }, []);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-bold">وضعیت قراردادها</h3>

      <div className="space-y-5">
        {contracts.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
            اطلاعات قراردادی ثبت نشده است.
          </div>
        ) : (
          contracts.map((contract) => (
            <ContractCard key={contract.id} {...contract} />
          ))
        )}
      </div>
    </div>
  );
}
