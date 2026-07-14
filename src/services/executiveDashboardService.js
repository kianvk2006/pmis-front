import {
  getEVMBaseline,
  getProgressRecords,
  getActualCostRecords,
  getDelayRecords,
  getProjects,
} from "@/data/repositories/projectRepository";

import { calculateEVM } from "@/data/evm/evmCalculator";

const PROJECT_ID = "PROJECT-001";

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function calculateOverallProgress(activities, progressRecords) {
  if (activities.length === 0) {
    return 0;
  }

  const progressMap = new Map();

  progressRecords.forEach((item) => {
    progressMap.set(item.activityId, normalizeNumber(item.progressPercent));
  });

  let totalBudget = 0;
  let earnedBudget = 0;

  activities.forEach((activity) => {
    const budget = normalizeNumber(activity.budget);

    const progress = normalizeNumber(progressMap.get(activity.activityId));

    totalBudget += budget;

    earnedBudget += budget * (progress / 100);
  });

  if (totalBudget === 0) {
    return 0;
  }

  return Math.round((earnedBudget / totalBudget) * 100);
}

export function getExecutiveDashboardData() {
  const baseline = getEVMBaseline(PROJECT_ID);

  const progressRecords = getProgressRecords(PROJECT_ID);

  const actualCostRecords = getActualCostRecords(PROJECT_ID);

  const delayRecords = getDelayRecords(PROJECT_ID);

  const projects = getProjects();

  const evm = calculateEVM({
    baseline,
    progressRecords,
    actualCostRecords,
  });

  const progress = calculateOverallProgress(
    baseline?.activities ?? [],
    progressRecords,
  );

  const cpi = normalizeNumber(evm?.cpi);

  const spi = normalizeNumber(evm?.spi);

  const budgetHealth = clamp(Math.round(cpi * 100));

  const scheduleHealth = clamp(Math.round(spi * 100));

  const project = projects.find((item) => item.id === PROJECT_ID) ?? null;

  return {
    project,

    kpis: {
      progress,

      budgetHealth,

      scheduleHealth,

      riskCount: normalizeArray(delayRecords).length,
    },

    financial: {
      bac: normalizeNumber(evm?.bac),

      ac: normalizeNumber(evm?.ac),

      ev: normalizeNumber(evm?.ev),

      pv: normalizeNumber(evm?.pv),

      spi,

      cpi,
    },

    activities: normalizeArray(progressRecords),

    delays: normalizeArray(delayRecords),

    baselineActivities: normalizeArray(baseline?.activities),
  };
}
export function getExecutiveActivities() {
  const progressRecords = getProgressRecords(PROJECT_ID);

  return progressRecords
    .slice()
    .sort((a, b) => {
      const first = new Date(b.createdAt ?? b.reportDate ?? 0).getTime();

      const second = new Date(a.createdAt ?? a.reportDate ?? 0).getTime();

      return first - second;
    })
    .slice(0, 8)
    .map((item) => ({
      id: item.id,

      title: item.activityName ?? item.activityId,

      description: `پیشرفت ${item.progressPercent}% ثبت شد.`,

      time: item.reportDate ?? item.createdAt ?? "",

      type: item.progressPercent >= 100 ? "success" : "pending",
    }));
}
export function getExecutiveRisks() {
  const dashboard = getExecutiveDashboardData();

  const risks = [];

  if ((dashboard.spi ?? 1) < 1) {
    risks.push({
      id: "schedule",
      title: "ریسک تأخیر زمان‌بندی",
      description:
        "شاخص SPI کمتر از 1 است و پروژه از برنامه عقب‌تر حرکت می‌کند.",
      level: "high",
      type: "delay",
    });
  }

  if ((dashboard.cpi ?? 1) < 1) {
    risks.push({
      id: "cost",
      title: "ریسک افزایش هزینه",
      description:
        "شاخص CPI کمتر از 1 است و هزینه واقعی از ارزش کسب‌شده بیشتر است.",
      level: "high",
      type: "budget",
    });
  }

  if ((dashboard.delays ?? 0) > 0) {
    risks.push({
      id: "delay-record",
      title: "وجود تأخیر ثبت‌شده",
      description: `${dashboard.delays} مورد تأخیر برای پروژه ثبت شده است.`,
      level: "medium",
      type: "risk",
    });
  }

  if (risks.length === 0) {
    risks.push({
      id: "ok",
      title: "وضعیت پروژه پایدار است",
      description: "در حال حاضر ریسک بحرانی برای پروژه شناسایی نشده است.",
      level: "low",
      type: "safety",
    });
  }

  return risks;
}
export function getExecutiveContracts() {
  const dashboard = getExecutiveDashboardData();

  const project = dashboard.project;

  if (!project) {
    return [];
  }

  return [
    {
      id: project.id,

      title: project.name,

      contractor: "پیمانکار اصلی",

      progress: dashboard.progress,

      amount: dashboard.bac,

      paid: dashboard.ac,
    },
  ];
}

export function getExecutiveMilestones() {
  const baseline = getEVMBaseline(PROJECT_ID);

  const activities = normalizeArray(baseline.activities)
    .slice()
    .sort((a, b) => {
      return (
        new Date(a.plannedStartDate).getTime() -
        new Date(b.plannedStartDate).getTime()
      );
    });

  const today = new Date();

  return activities.map((activity) => {
    const start = new Date(activity.plannedStartDate);
    const end = new Date(activity.plannedEndDate);

    let status = "upcoming";

    if (today >= end) {
      status = "done";
    } else if (today >= start && today <= end) {
      status = "current";
    }

    return {
      id: activity.id,

      title: activity.activityName || activity.activityId,

      date: activity.plannedEndDate,

      status,
    };
  });
}
