export default function DependencyLine({ dependency }) {
  const { fromX, fromY, toX, toY } = dependency;

  const middleX = fromX + 25;

  return (
    <path
      d={`
        M ${fromX} ${fromY}
        L ${middleX} ${fromY}
        L ${middleX} ${toY}
        L ${toX} ${toY}
      `}
      stroke="#2563EB"
      strokeWidth={2}
      fill="none"
    />
  );
}
