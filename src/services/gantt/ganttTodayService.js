const DAY_WIDTH = 32;

export function calculateTodayPosition(projectStart) {
  const start = new Date(projectStart);

  const today = new Date();

  const days = Math.floor((today - start) / (1000 * 60 * 60 * 24));

  return days * DAY_WIDTH;
}
