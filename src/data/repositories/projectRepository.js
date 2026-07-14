import {
  getStorageItem,
  setStorageItem,
} from "@/services/storage/storageService";

import { initialProjectData } from "@/mocks/database/initialProjectData";

const PROJECT_DATA_KEY = "project-data";

/*
  HELPERS
*/

function cloneInitialData() {
  return JSON.parse(JSON.stringify(initialProjectData));
}

function createId(prefix) {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

/*
  DATABASE
*/

function getDatabase() {
  const database = getStorageItem(PROJECT_DATA_KEY, null);

  if (!database) {
    const initialDatabase = cloneInitialData();

    setStorageItem(PROJECT_DATA_KEY, initialDatabase);

    return initialDatabase;
  }

  /*
    اگر بعداً Collection جدیدی
    به initialProjectData اضافه شود،
    Database قبلی همچنان قابل استفاده است.
  */

  return {
    ...cloneInitialData(),
    ...database,
  };
}

function saveDatabase(database) {
  const saved = setStorageItem(PROJECT_DATA_KEY, database);

  if (!saved) {
    throw new Error("PROJECT_DATABASE_SAVE_FAILED");
  }

  return database;
}

/*
  REPORT IDENTITY
*/

function getReportIdentity(report) {
  return {
    projectId: report?.generalInfo?.projectId ?? "",

    reportDate: report?.generalInfo?.reportDate ?? "",

    shift: report?.generalInfo?.shift ?? "",
  };
}

function isSameReport(firstReport, secondReport) {
  const firstIdentity = getReportIdentity(firstReport);

  const secondIdentity = getReportIdentity(secondReport);

  return (
    firstIdentity.projectId === secondIdentity.projectId &&
    firstIdentity.reportDate === secondIdentity.reportDate &&
    firstIdentity.shift === secondIdentity.shift
  );
}

/*
  COLLECTION HELPERS
*/

function removeReportRecords(records, reportId) {
  return normalizeArray(records).filter((item) => item.reportId !== reportId);
}

function addReportMetadata({
  items,
  reportId,
  projectId,
  reportDate,
  shift,
  submittedAt,
}) {
  return normalizeArray(items).map((item) => ({
    ...item,

    reportId,

    projectId,

    reportDate,

    shift,

    submittedAt,
  }));
}

/*
  DATA UPDATE EVENT
*/

function dispatchDataUpdated({ projectId, reportId, operation }) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("pmis:data-updated", {
      detail: {
        projectId,

        reportId,

        operation,

        source: "site-report",
      },
    }),
  );
}

/*
  DATABASE GETTERS
*/

export function getProjectDatabase() {
  return getDatabase();
}

/*
  PROJECTS
*/

export function getProjects() {
  return normalizeArray(getDatabase().projects);
}

export function getProjectById(projectId) {
  return getProjects().find((project) => project.id === projectId) ?? null;
}
/*
  PROJECT ACTIVITIES / ACTIVITY MASTER
*/

export function getProjectActivities(projectId, options = {}) {
  const activities = normalizeArray(getDatabase().activities);

  const { includeInactive = false } = options;

  return activities.filter((activity) => {
    const matchesProject = !projectId || activity.projectId === projectId;

    const matchesStatus = includeInactive || activity.status !== "inactive";

    return matchesProject && matchesStatus;
  });
}

export function getProjectActivityById(activityId) {
  if (!activityId) {
    return null;
  }

  return (
    normalizeArray(getDatabase().activities).find(
      (activity) => activity.id === activityId,
    ) ?? null
  );
}

export function saveProjectActivity(payload) {
  const database = getDatabase();

  const projectId = payload?.projectId;

  if (!projectId) {
    throw new Error("PROJECT_ACTIVITY_PROJECT_ID_REQUIRED");
  }

  const name = String(payload?.name ?? "").trim();

  if (!name) {
    throw new Error("PROJECT_ACTIVITY_NAME_REQUIRED");
  }

  const now = new Date().toISOString();

  const activityId = payload?.id ?? createId("ACTIVITY");

  const existingActivity = normalizeArray(database.activities).find(
    (activity) => activity.id === activityId,
  );

  const activity = {
    ...existingActivity,
    ...payload,

    id: activityId,

    projectId,

    name,

    wbsCode: String(payload?.wbsCode ?? "").trim(),

    unit: String(payload?.unit ?? "").trim(),

    status: payload?.status ?? existingActivity?.status ?? "active",

    createdAt: existingActivity?.createdAt ?? payload?.createdAt ?? now,

    updatedAt: now,
  };

  database.activities = [
    ...normalizeArray(database.activities).filter(
      (item) => item.id !== activity.id,
    ),

    activity,
  ];

  saveDatabase(database);

  dispatchDataUpdated({
    projectId,
    reportId: null,
    operation: existingActivity
      ? "project-activity-updated"
      : "project-activity-created",
  });

  return {
    activity,

    operation: existingActivity ? "updated" : "created",
  };
}

export function setProjectActivityStatus(activityId, status) {
  if (!activityId) {
    return null;
  }

  const database = getDatabase();

  const activities = normalizeArray(database.activities);

  const existingActivity = activities.find(
    (activity) => activity.id === activityId,
  );

  if (!existingActivity) {
    return null;
  }

  const activity = {
    ...existingActivity,

    status,

    updatedAt: new Date().toISOString(),
  };

  database.activities = [
    ...activities.filter((item) => item.id !== activityId),

    activity,
  ];

  saveDatabase(database);

  dispatchDataUpdated({
    projectId: activity.projectId ?? null,

    reportId: null,

    operation: "project-activity-status-updated",
  });

  return activity;
}

/*
  SITE REPORTS
*/

export function getSiteReports(projectId) {
  const reports = normalizeArray(getDatabase().siteReports);

  if (!projectId) {
    return reports;
  }

  return reports.filter(
    (report) => report.generalInfo?.projectId === projectId,
  );
}

export function getSiteReportById(reportId) {
  return getSiteReports().find((report) => report.id === reportId) ?? null;
}

export function getSiteReportByIdentity({ projectId, reportDate, shift }) {
  return (
    getSiteReports(projectId).find(
      (report) =>
        report.generalInfo?.reportDate === reportDate &&
        report.generalInfo?.shift === shift,
    ) ?? null
  );
}

/*
  SUBMIT / UPDATE SITE REPORT
*/

export function submitSiteReport(payload) {
  const database = getDatabase();

  const siteReports = normalizeArray(database.siteReports);

  /*
    اگر reportId وجود داشته باشد،
    گزارش در حالت Edit است.

    در این حالت گزارش فقط با ID
    پیدا می‌شود.
  */

  const editingReportId = payload?.reportId ?? null;

  let existingReport = null;

  if (editingReportId) {
    existingReport =
      siteReports.find((report) => report.id === editingReportId) ?? null;

    /*
      اگر کاربر قصد Edit داشته باشد
      ولی Report پیدا نشود،
      گزارش جدید ایجاد نمی‌کنیم.

      چون این کار می‌تواند باعث
      Duplicate ناخواسته شود.
    */

    if (!existingReport) {
      throw new Error("EDIT_SITE_REPORT_NOT_FOUND");
    }
  } else {
    /*
      هنگام ایجاد گزارش جدید،
      Duplicate Detection بر اساس:

      projectId
      reportDate
      shift

      انجام می‌شود.
    */

    existingReport =
      siteReports.find((report) => isSameReport(report, payload)) ?? null;
  }

  const operation = existingReport ? "updated" : "created";

  const submittedAt = new Date().toISOString();

  /*
    هنگام Update همان ID قبلی
    حفظ می‌شود.
  */

  const reportId = existingReport?.id ?? createId("REPORT");

  /*
    createdAt هنگام Update
    نباید تغییر کند.
  */

  const createdAt =
    existingReport?.createdAt ?? payload?.meta?.createdAt ?? submittedAt;

  /*
    reportId و meta
    متعلق به Store هستند.

    photoItems نیز در Repository
    با نام photos ذخیره می‌شود.
  */

  const {
    reportId: ignoredReportId,
    meta: ignoredMeta,
    photoItems,
    ...payloadData
  } = payload;

  const report = {
    ...payloadData,

    id: reportId,

    status: "submitted",

    photos: normalizeArray(photoItems),

    createdAt,

    updatedAt: submittedAt,

    submittedAt,
  };

  const projectId = report.generalInfo?.projectId ?? "";

  const reportDate = report.generalInfo?.reportDate ?? "";

  const shift = report.generalInfo?.shift ?? "";

  /*
    REPORT COLLECTION

    نسخه قبلی گزارش حذف می‌شود
    و نسخه جدید جایگزین می‌شود.
  */

  database.siteReports = [
    ...siteReports.filter((item) => item.id !== reportId),

    report,
  ];

  /*
    REMOVE OLD REPORT RECORDS

    قبل از اضافه کردن رکوردهای جدید،
    تمام رکوردهای قبلی متعلق به این
    Report حذف می‌شوند.
  */

  database.progressRecords = removeReportRecords(
    database.progressRecords,
    reportId,
  );

  database.workforceRecords = removeReportRecords(
    database.workforceRecords,
    reportId,
  );

  database.equipmentRecords = removeReportRecords(
    database.equipmentRecords,
    reportId,
  );

  database.materialConsumptions = removeReportRecords(
    database.materialConsumptions,
    reportId,
  );

  database.materialRequests = removeReportRecords(
    database.materialRequests,
    reportId,
  );

  database.delayRecords = removeReportRecords(database.delayRecords, reportId);

  database.photos = removeReportRecords(database.photos, reportId);

  /*
    PROGRESS RECORDS
  */

  database.progressRecords = [
    ...normalizeArray(database.progressRecords),

    ...addReportMetadata({
      items: report.progressItems,

      reportId,

      projectId,

      reportDate,

      shift,

      submittedAt,
    }),
  ];

  /*
    WORKFORCE RECORDS
  */

  database.workforceRecords = [
    ...normalizeArray(database.workforceRecords),

    ...addReportMetadata({
      items: report.workforceItems,

      reportId,

      projectId,

      reportDate,

      shift,

      submittedAt,
    }),
  ];

  /*
    EQUIPMENT RECORDS
  */

  database.equipmentRecords = [
    ...normalizeArray(database.equipmentRecords),

    ...addReportMetadata({
      items: report.equipmentItems,

      reportId,

      projectId,

      reportDate,

      shift,

      submittedAt,
    }),
  ];

  /*
    MATERIAL CONSUMPTIONS
  */

  database.materialConsumptions = [
    ...normalizeArray(database.materialConsumptions),

    ...addReportMetadata({
      items: report.materialConsumptions,

      reportId,

      projectId,

      reportDate,

      shift,

      submittedAt,
    }),
  ];

  /*
    MATERIAL REQUESTS
  */

  database.materialRequests = [
    ...normalizeArray(database.materialRequests),

    ...addReportMetadata({
      items: report.materialRequests,

      reportId,

      projectId,

      reportDate,

      shift,

      submittedAt,
    }),
  ];

  /*
    DELAYS
  */

  database.delayRecords = [
    ...normalizeArray(database.delayRecords),

    ...addReportMetadata({
      items: report.delayItems,

      reportId,

      projectId,

      reportDate,

      shift,

      submittedAt,
    }),
  ];

  /*
    PHOTOS
  */

  database.photos = [
    ...normalizeArray(database.photos),

    ...addReportMetadata({
      items: report.photos,

      reportId,

      projectId,

      reportDate,

      shift,

      submittedAt,
    }),
  ];

  /*
    SAVE DATABASE
  */

  saveDatabase(database);

  /*
    NOTIFY OTHER DASHBOARDS
  */

  dispatchDataUpdated({
    projectId,

    reportId,

    operation,
  });

  /*
    STANDARD REPOSITORY RESULT
  */

  return {
    report,

    operation,
  };
}

/*
  PROGRESS RECORDS
*/

export function getProgressRecords(projectId) {
  const records = normalizeArray(getDatabase().progressRecords);

  return projectId
    ? records.filter((item) => item.projectId === projectId)
    : records;
}

/*
  WORKFORCE RECORDS
*/

export function getWorkforceRecords(projectId) {
  const records = normalizeArray(getDatabase().workforceRecords);

  return projectId
    ? records.filter((item) => item.projectId === projectId)
    : records;
}

/*
  EQUIPMENT RECORDS
*/

export function getEquipmentRecords(projectId) {
  const records = normalizeArray(getDatabase().equipmentRecords);

  return projectId
    ? records.filter((item) => item.projectId === projectId)
    : records;
}

/*
  MATERIAL CONSUMPTIONS
*/

export function getMaterialConsumptions(projectId) {
  const records = normalizeArray(getDatabase().materialConsumptions);

  return projectId
    ? records.filter((item) => item.projectId === projectId)
    : records;
}

/*
  MATERIAL REQUESTS
*/

export function getMaterialRequests(projectId) {
  const records = normalizeArray(getDatabase().materialRequests);

  return projectId
    ? records.filter((item) => item.projectId === projectId)
    : records;
}

/*
  DELAY RECORDS
*/

export function getDelayRecords(projectId) {
  const records = normalizeArray(getDatabase().delayRecords);

  return projectId
    ? records.filter((item) => item.projectId === projectId)
    : records;
}

/*
  PROJECT PHOTOS
*/

export function getProjectPhotos(projectId) {
  const records = normalizeArray(getDatabase().photos);

  return projectId
    ? records.filter((item) => item.projectId === projectId)
    : records;
}

export function getEVMBaselines(projectId) {
  const baselines = normalizeArray(getDatabase().evmBaselines);

  if (!projectId) {
    return baselines;
  }

  return baselines.filter((baseline) => baseline.projectId === projectId);
}

export function getEVMBaseline(projectId) {
  if (!projectId) {
    return null;
  }

  return (
    getEVMBaselines(projectId).find(
      (baseline) => baseline.projectId === projectId,
    ) ?? null
  );
}

export function saveEVMBaseline(payload) {
  const database = getDatabase();

  const projectId = payload?.projectId;

  if (!projectId) {
    throw new Error("EVM_BASELINE_PROJECT_ID_REQUIRED");
  }

  const now = new Date().toISOString();

  const existingBaseline = normalizeArray(database.evmBaselines).find(
    (baseline) => baseline.projectId === projectId,
  );

  const baseline = {
    ...payload,

    id: existingBaseline?.id ?? payload?.id ?? createId("EVM-BASELINE"),

    projectId,

    activities: normalizeArray(payload?.activities),

    createdAt: existingBaseline?.createdAt ?? payload?.createdAt ?? now,

    updatedAt: now,
  };

  database.evmBaselines = [
    ...normalizeArray(database.evmBaselines).filter(
      (item) => item.projectId !== projectId,
    ),

    baseline,
  ];

  saveDatabase(database);

  dispatchDataUpdated({
    projectId,
    reportId: null,
    operation: existingBaseline
      ? "evm-baseline-updated"
      : "evm-baseline-created",
  });

  return {
    baseline,

    operation: existingBaseline ? "updated" : "created",
  };
}

export function getActualCostRecords(projectId) {
  const records = normalizeArray(getDatabase().actualCostRecords);

  if (!projectId) {
    return records;
  }

  return records.filter((record) => record.projectId === projectId);
}

export function saveActualCostRecord(payload) {
  const database = getDatabase();

  const projectId = payload?.projectId;

  if (!projectId) {
    throw new Error("ACTUAL_COST_PROJECT_ID_REQUIRED");
  }

  const now = new Date().toISOString();

  const record = {
    ...payload,

    id: payload?.id ?? createId("ACTUAL-COST"),

    projectId,

    amount: Number(payload?.amount) || 0,

    createdAt: payload?.createdAt ?? now,

    updatedAt: now,
  };

  const existingRecord = normalizeArray(database.actualCostRecords).find(
    (item) => item.id === record.id,
  );

  database.actualCostRecords = [
    ...normalizeArray(database.actualCostRecords).filter(
      (item) => item.id !== record.id,
    ),

    record,
  ];

  saveDatabase(database);

  dispatchDataUpdated({
    projectId,
    reportId: record.reportId ?? null,
    operation: existingRecord ? "actual-cost-updated" : "actual-cost-created",
  });

  return {
    record,

    operation: existingRecord ? "updated" : "created",
  };
}

export function deleteActualCostRecord(recordId) {
  if (!recordId) {
    return false;
  }

  const database = getDatabase();

  const records = normalizeArray(database.actualCostRecords);

  const record = records.find((item) => item.id === recordId);

  if (!record) {
    return false;
  }

  database.actualCostRecords = records.filter((item) => item.id !== recordId);

  saveDatabase(database);

  dispatchDataUpdated({
    projectId: record.projectId ?? null,
    reportId: record.reportId ?? null,
    operation: "actual-cost-deleted",
  });

  return true;
}
