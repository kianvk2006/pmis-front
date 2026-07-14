function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

/*
  مخصوص محاسبات داخلی EVM.

  مقادیر خالی و نامعتبر در جمع‌ها و محاسبات پایه
  برابر صفر در نظر گرفته می‌شوند.
*/

function toFiniteNumber(value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

/*
  تقسیم امن.

  اگر مخرج معتبر و بزرگ‌تر از صفر نباشد،
  شاخص قابل محاسبه نیست و null برمی‌گردد.
*/

function safeDivide(numerator, denominator) {
  const safeNumerator = toFiniteNumber(numerator);

  const safeDenominator = toFiniteNumber(denominator);

  if (safeDenominator <= 0) {
    return null;
  }

  return safeNumerator / safeDenominator;
}

function normalizeDate(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function clampProgress(value) {
  return Math.min(100, Math.max(0, toFiniteNumber(value)));
}

function getActivityId(item) {
  return item?.activityId ?? item?.wbsId ?? item?.taskId ?? item?.id ?? null;
}

function getProgress(item) {
  return clampProgress(
    item?.progressPercent ??
      item?.progress ??
      item?.actualProgress ??
      item?.percentage ??
      item?.percent ??
      0,
  );
}

function getRecordTime(item) {
  const value =
    item?.submittedAt ??
    item?.reportDate ??
    item?.updatedAt ??
    item?.createdAt ??
    null;

  const date = normalizeDate(value);

  return date ? date.getTime() : 0;
}

function getLatestProgressRecords(records, dataDate) {
  const activityMap = new Map();

  const currentDate = normalizeDate(dataDate);

  normalizeArray(records).forEach((item) => {
    const activityId = getActivityId(item);

    if (!activityId) {
      return;
    }

    const recordTime = getRecordTime(item);

    /*
      رکوردهای بعد از Data Date
      وارد محاسبه نمی‌شوند.
    */

    if (currentDate && recordTime > currentDate.getTime()) {
      return;
    }

    const currentRecord = activityMap.get(activityId);

    if (!currentRecord || recordTime >= getRecordTime(currentRecord)) {
      activityMap.set(activityId, item);
    }
  });

  return Array.from(activityMap.values());
}

function calculateBAC(activities) {
  return normalizeArray(activities).reduce(
    (total, activity) => total + toFiniteNumber(activity?.budget),
    0,
  );
}

function calculatePVForActivity(activity, dataDate) {
  const budget = toFiniteNumber(activity?.budget);

  const plannedStartDate = normalizeDate(activity?.plannedStartDate);

  const plannedEndDate = normalizeDate(activity?.plannedEndDate);

  const currentDate = normalizeDate(dataDate);

  if (budget <= 0 || !plannedStartDate || !plannedEndDate || !currentDate) {
    return 0;
  }

  const startTime = plannedStartDate.getTime();

  const endTime = plannedEndDate.getTime();

  const currentTime = currentDate.getTime();

  /*
    در لحظه شروع فعالیت
    PV هنوز صفر است.
  */

  if (currentTime <= startTime) {
    return 0;
  }

  if (currentTime >= endTime) {
    return budget;
  }

  const duration = endTime - startTime;

  if (duration <= 0) {
    return 0;
  }

  const elapsed = currentTime - startTime;

  const plannedProgress = elapsed / duration;

  return budget * plannedProgress;
}

function calculatePV(activities, dataDate) {
  return normalizeArray(activities).reduce(
    (total, activity) => total + calculatePVForActivity(activity, dataDate),
    0,
  );
}

function calculateEV(activities, progressRecords, dataDate) {
  const latestProgressRecords = getLatestProgressRecords(
    progressRecords,
    dataDate,
  );

  const progressMap = new Map();

  latestProgressRecords.forEach((item) => {
    const activityId = getActivityId(item);

    progressMap.set(activityId, getProgress(item));
  });

  return normalizeArray(activities).reduce((total, activity) => {
    const activityId = getActivityId(activity);

    const budget = toFiniteNumber(activity?.budget);

    const actualProgress = progressMap.get(activityId) ?? 0;

    return total + budget * (actualProgress / 100);
  }, 0);
}

function calculateAC(actualCostRecords, dataDate) {
  const currentDate = normalizeDate(dataDate);

  return normalizeArray(actualCostRecords).reduce((total, record) => {
    const recordDate = normalizeDate(
      record?.reportDate ?? record?.date ?? record?.createdAt,
    );

    if (
      currentDate &&
      recordDate &&
      recordDate.getTime() > currentDate.getTime()
    ) {
      return total;
    }

    return total + toFiniteNumber(record?.amount);
  }, 0);
}

export function calculateEVM({
  baseline,
  progressRecords,
  actualCostRecords,
  dataDate = new Date().toISOString(),
}) {
  const activities = normalizeArray(baseline?.activities);

  const calculatedBAC = calculateBAC(activities);

  const baselineBAC = toFiniteNumber(baseline?.bac);

  const bac = baselineBAC > 0 ? baselineBAC : calculatedBAC;

  const pv = calculatePV(activities, dataDate);

  const ev = calculateEV(activities, progressRecords, dataDate);

  const ac = calculateAC(actualCostRecords, dataDate);

  /*
    شاخص‌های عملکرد
  */

  const spi = safeDivide(ev, pv);

  const cpi = safeDivide(ev, ac);

  /*
    انحراف‌ها.

    SV و CV حتی در صورت صفر بودن داده‌های پایه
    از نظر ریاضی قابل محاسبه هستند.
  */

  const sv = ev - pv;

  const cv = ev - ac;

  /*
    پیش‌بینی هزینه.

    بدون CPI معتبر، EAC / ETC / VAC
    قابل محاسبه نیستند.
  */

  const eac = cpi !== null && cpi > 0 && bac > 0 ? bac / cpi : null;

  const etc = eac !== null ? Math.max(0, eac - ac) : null;

  const vac = eac !== null ? bac - eac : null;

  return {
    dataDate,

    pv,
    ev,
    ac,
    bac,

    spi,
    cpi,

    sv,
    cv,

    eac,
    etc,
    vac,
  };
}

export function calculateEVMHistory({
  baseline,
  progressRecords,
  actualCostRecords,
  dataDate = new Date().toISOString(),
}) {
  const activities = normalizeArray(baseline?.activities);

  if (activities.length === 0) {
    return [];
  }

  const finalDataDate = normalizeDate(dataDate);

  if (!finalDataDate) {
    return [];
  }

  /*
    استخراج تاریخ‌های معتبر Baseline.
  */

  const activityDates = activities
    .flatMap((activity) => [
      normalizeDate(activity?.plannedStartDate),

      normalizeDate(activity?.plannedEndDate),
    ])
    .filter(Boolean);

  if (activityDates.length === 0) {
    return [];
  }

  const baselineStartTime = Math.min(
    ...activityDates.map((date) => date.getTime()),
  );

  const baselineEndTime = Math.max(
    ...activityDates.map((date) => date.getTime()),
  );

  const baselineStartDate = new Date(baselineStartTime);

  const baselineEndDate = new Date(baselineEndTime);

  /*
    نمودار بعد از پایان Baseline
    ادامه پیدا نمی‌کند.
  */

  const chartEndDate = new Date(
    Math.min(finalDataDate.getTime(), baselineEndDate.getTime()),
  );

  if (chartEndDate.getTime() < baselineStartDate.getTime()) {
    return [];
  }

  const history = [];

  const cursor = new Date(
    baselineStartDate.getFullYear(),
    baselineStartDate.getMonth(),
    1,
  );

  while (cursor.getTime() <= chartEndDate.getTime()) {
    const monthEndDate = new Date(
      cursor.getFullYear(),
      cursor.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    const pointDate = new Date(
      Math.min(monthEndDate.getTime(), chartEndDate.getTime()),
    );

    const result = calculateEVM({
      baseline,
      progressRecords,
      actualCostRecords,
      dataDate: pointDate.toISOString(),
    });

    history.push({
      date: pointDate.toISOString(),

      label: pointDate.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "short",
      }),

      pv: result.pv,

      ev: result.ev,

      ac: result.ac,
    });

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return history;
}
