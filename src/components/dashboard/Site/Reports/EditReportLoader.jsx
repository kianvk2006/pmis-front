import { useEffect, useRef } from "react";

import { useSearchParams } from "react-router-dom";

import { getSiteReportById } from "@/data/repositories/projectRepository";

import { useSiteReport } from "../store";

export default function EditReportLoader() {
  const [searchParams] = useSearchParams();

  const { loadReport } = useSiteReport();

  /*
    جلوگیری از Load تکراری گزارش
    در Renderهای بعدی.
  */

  const loadedReportIdRef = useRef(null);

  const editReportId = searchParams.get("editReport");

  useEffect(() => {
    /*
      اگر Query Parameter وجود ندارد،
      هیچ کاری انجام نمی‌دهیم.

      مهم:
      اینجا resetReport اجرا نمی‌کنیم،
      چون بعد از Submit ممکن است Store
      دارای reportId باشد.
    */

    if (!editReportId) {
      return;
    }

    /*
      اگر همین گزارش قبلاً Load شده،
      دوباره Store را تغییر نمی‌دهیم.
    */

    if (loadedReportIdRef.current === editReportId) {
      return;
    }

    const storedReport = getSiteReportById(editReportId);

    if (!storedReport) {
      console.error("EDIT_SITE_REPORT_NOT_FOUND", editReportId);

      return;
    }

    /*
      SiteReportContext گزارش Repository
      را Normalize می‌کند:

      id -> reportId
      photos -> photoItems
      createdAt/updatedAt/submittedAt -> meta
    */

    loadReport(storedReport);

    loadedReportIdRef.current = editReportId;
  }, [editReportId, loadReport]);

  return null;
}
