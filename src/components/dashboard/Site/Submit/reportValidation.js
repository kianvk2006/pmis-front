export function validateSiteReport(report) {
  const errors = [];

  if (!report) {
    return ["اطلاعات گزارش در دسترس نیست."];
  }

  const generalInfo = report.generalInfo ?? {};

  if (!generalInfo.projectId) {
    errors.push("انتخاب پروژه الزامی است.");
  }

  if (!generalInfo.reportDate) {
    errors.push("تاریخ گزارش الزامی است.");
  }

  if (!generalInfo.shift) {
    errors.push("انتخاب شیفت کاری الزامی است.");
  }

  if (!generalInfo.weather) {
    errors.push("ثبت وضعیت آب‌وهوا الزامی است.");
  }

  if (!generalInfo.supervisor?.trim()) {
    errors.push("نام سرپرست کارگاه الزامی است.");
  }

  const progressItems = Array.isArray(report.progressItems)
    ? report.progressItems
    : [];

  if (progressItems.length === 0) {
    errors.push("حداقل یک رکورد پیشرفت عملیات باید ثبت شود.");
  }

  progressItems.forEach((item, index) => {
    if (!item.activityId) {
      errors.push(`فعالیت رکورد پیشرفت شماره ${index + 1} مشخص نشده است.`);
    }

    const progressPercent = Number(item.progressPercent);

    if (
      Number.isNaN(progressPercent) ||
      progressPercent < 0 ||
      progressPercent > 100
    ) {
      errors.push(`درصد پیشرفت رکورد شماره ${index + 1} معتبر نیست.`);
    }

    if (Number(item.workHours) < 0) {
      errors.push(`ساعت کاری رکورد پیشرفت شماره ${index + 1} معتبر نیست.`);
    }
  });

  const workforceItems = Array.isArray(report.workforceItems)
    ? report.workforceItems
    : [];

  workforceItems.forEach((item, index) => {
    if (!item.role?.trim()) {
      errors.push(`عنوان نیروی انسانی در ردیف ${index + 1} مشخص نشده است.`);
    }

    if (Number(item.count) < 0) {
      errors.push(`تعداد نیروی انسانی در ردیف ${index + 1} معتبر نیست.`);
    }
  });

  const equipmentItems = Array.isArray(report.equipmentItems)
    ? report.equipmentItems
    : [];

  equipmentItems.forEach((item, index) => {
    if (!item.equipmentId && !item.name?.trim()) {
      errors.push(`تجهیزات ردیف ${index + 1} مشخص نشده است.`);
    }
  });

  const materialConsumptions = Array.isArray(report.materialConsumptions)
    ? report.materialConsumptions
    : [];

  materialConsumptions.forEach((item, index) => {
    if (!item.materialId) {
      errors.push(`مصالح مصرفی ردیف ${index + 1} مشخص نشده است.`);
    }

    if (Number(item.quantity) <= 0) {
      errors.push(
        `مقدار مصرف مصالح در ردیف ${index + 1} باید بیشتر از صفر باشد.`,
      );
    }
  });

  const materialRequests = Array.isArray(report.materialRequests)
    ? report.materialRequests
    : [];

  materialRequests.forEach((item, index) => {
    if (!item.materialId) {
      errors.push(`مصالح درخواستی ردیف ${index + 1} مشخص نشده است.`);
    }

    if (Number(item.quantity) <= 0) {
      errors.push(
        `مقدار درخواست مصالح در ردیف ${index + 1} باید بیشتر از صفر باشد.`,
      );
    }
  });

  const delayItems = Array.isArray(report.delayItems) ? report.delayItems : [];

  delayItems.forEach((item, index) => {
    if (!item.reason?.trim()) {
      errors.push(`علت تأخیر در ردیف ${index + 1} مشخص نشده است.`);
    }
  });

  return errors;
}
