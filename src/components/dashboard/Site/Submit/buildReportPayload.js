export function buildReportPayload(report) {
  return {
    reportId: report.reportId ?? null,

    status: report.status ?? "draft",

    generalInfo: {
      ...report.generalInfo,
    },

    progressItems: report.progressItems ?? [],

    workforceItems: report.workforceItems ?? [],

    equipmentItems: report.equipmentItems ?? [],

    materialConsumptions: report.materialConsumptions ?? [],

    materialRequests: report.materialRequests ?? [],

    delayItems: report.delayItems ?? [],

    photoItems: report.photoItems ?? [],

    meta: {
      ...(report.meta ?? {}),
    },
  };
}
