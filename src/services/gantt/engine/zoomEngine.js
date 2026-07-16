const ZOOM = {
  day: 32,

  week: 16,

  month: 6,
};

export function getDayWidth(zoom) {
  return ZOOM[zoom] ?? 32;
}
