import DependencyLine from "./DependencyLine";

export default function DependencyLayer({ dependencies = [] }) {
  return (
    <svg
      className="
      absolute
      inset-0
      pointer-events-none
      overflow-visible
      "
    >
      {dependencies.map((dependency) => (
        <DependencyLine
          key={`${dependency.from}-${dependency.to}`}
          dependency={dependency}
        />
      ))}
    </svg>
  );
}
