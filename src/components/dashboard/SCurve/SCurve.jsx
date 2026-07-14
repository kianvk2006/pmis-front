import Card from "@/components/ui/Card";

import SCurveChart from "./SCurveChart";
import SCurveLegend from "./SCurveLegend";

export default function SCurve() {
  return (
    <Card>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            منحنی پیشرفت پروژه (S-Curve)
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            مقایسه برنامه، عملکرد واقعی و پیش‌بینی پروژه
          </p>

        </div>

      </div>

      <SCurveChart />

      <SCurveLegend />

    </Card>
  );
}