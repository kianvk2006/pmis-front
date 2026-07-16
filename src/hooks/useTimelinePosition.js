export default function getTimelinePosition(event, container, dayWidth) {
  const rect = container.getBoundingClientRect();

  const x = event.clientX - rect.left;

  return Math.floor(x / dayWidth);
}
