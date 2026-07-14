import { useCallback, useEffect, useState } from "react";

import { getEVMData } from "@/data/evm/evmRepository";

import Gauge from "./Gauge";

export default function EVMGauges() {
  const [evmData, setEVMData] = useState(null);

  const loadData = useCallback(() => {
    try {
      const data = getEVMData();

      setEVMData(data);
    } catch (error) {
      console.error("LOAD_EVM_GAUGES_ERROR", error);

      setEVMData(null);
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

  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <Gauge
        title="SPI - شاخص عملکرد زمان‌بندی"
        value={evmData?.spi}
        description="نسبت ارزش کسب‌شده به ارزش برنامه‌ریزی‌شده"
      />

      <Gauge
        title="CPI - شاخص عملکرد هزینه"
        value={evmData?.cpi}
        description="نسبت ارزش کسب‌شده به هزینه واقعی پروژه"
      />
    </section>
  );
}
