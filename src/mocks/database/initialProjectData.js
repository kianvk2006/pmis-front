export const initialProjectData = {
  projects: [
    {
      id: "PROJECT-001",
      name: "پروژه قطار برقی گلبهار مشهد",
      code: "PMIS-001",
      status: "active",
    },
  ],

  /*
    Activity Master

    منبع اصلی تعریف فعالیت‌های پروژه است.

    Baseline
    Site Reports
    Progress Records
    Actual Costs
    Execution Dashboard

    باید از activityIdهای این لیست استفاده کنند.
  */

  activities: [
    {
      id: "ACT-001",
      projectId: "PROJECT-001",
      wbsCode: "1.1",
      name: "خاکبرداری",
      unit: "متر مکعب",
      status: "active",
    },

    {
      id: "ACT-002",
      projectId: "PROJECT-001",
      wbsCode: "1.2",
      name: "زیرسازی مسیر",
      unit: "متر",
      status: "active",
    },

    {
      id: "ACT-003",
      projectId: "PROJECT-001",
      wbsCode: "1.3",
      name: "ریل‌گذاری",
      unit: "متر",
      status: "active",
    },

    {
      id: "ACT-004",
      projectId: "PROJECT-001",
      wbsCode: "1.4",
      name: "بتن‌ریزی",
      unit: "متر مکعب",
      status: "active",
    },
  ],

  siteReports: [],

  progressRecords: [],

  workforceRecords: [],

  equipmentRecords: [],

  materialConsumptions: [],

  materialRequests: [],

  delayRecords: [],

  actualCostRecords: [],

  evmBaselines: [],

  photos: [],
};