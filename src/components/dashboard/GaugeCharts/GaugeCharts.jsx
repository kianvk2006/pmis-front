import GaugeCard from "./GaugeCard";
import { gauges } from "./gaugeData";

export default function GaugeCharts() {
  return (
    <section
      className="
      grid
      grid-cols-2
      gap-6
      "
    >
      {gauges.map((item) => (
        <GaugeCard
          key={item.id}
          {...item}
        />
      ))}
    </section>
  );
}