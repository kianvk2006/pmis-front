import GaugeComponent from "react-gauge-component";

import GaugeHeader from "./GaugeHeader";
import GaugeStatus from "./GaugeStatus";

export default function GaugeCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <GaugeHeader title={title} />

      <GaugeComponent
        type="semicircle"
        value={value}
        // animationDuration={1200}
        animationDuration={0}
        labels={{
          valueLabel: {
            style: {
              fontSize: "34px",
              fill: "#0F172A",
              fontWeight: "700",
            },
            formatTextValue: () => `${value}%`,
          },
          tickLabels: {
            hideMinMax: true,
          },
        }}
        arc={{
          width: 0.22,
          padding: 0.02,
          colorArray: [color, "#E2E8F0"],
          subArcs: [
            {
              limit: value,
            },
            {
              limit: 100,
            },
          ],
        }}
        pointer={{
          hide: true,
        }}
      />

      <GaugeStatus value={value} />
    </div>
  );
}