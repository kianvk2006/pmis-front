export function buildMonths(projectStart, projectEnd) {
  const months = [];

  const cursor = new Date(
    projectStart.getFullYear(),
    projectStart.getMonth(),
    1,
  );

  while (cursor <= projectEnd) {
    months.push({
      label: new Intl.DateTimeFormat("fa-IR", {
        month: "long",
      }).format(cursor),

      year: cursor.getFullYear(),

      month: cursor.getMonth() + 1,
    });

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
}
