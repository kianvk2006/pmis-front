import RiskCard from "./RiskCard";

const risks = [
  {
    title: "تاخیر اجرای فاز دوم",
    description: "احتمال تأخیر به علت کمبود تجهیزات",
    level: "high",
    type: "delay",
  },
  {
    title: "افزایش هزینه خرید",
    description: "افزایش قیمت مصالح",
    level: "medium",
    type: "budget",
  },
  {
    title: "ریسک ایمنی کارگاه",
    description: "نیاز به بازرسی مجدد",
    level: "high",
    type: "safety",
  },
  {
    title: "ریسک اجرایی",
    description: "نیاز به بازنگری برنامه",
    level: "low",
    type: "risk",
  },
];

export default function ExecutiveRisks() {
  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-6
      shadow-sm
      "
    >
      <h3 className="mb-6 text-xl font-bold">

        ریسک‌ها و هشدارهای فعال

      </h3>

      <div className="space-y-4">

        {risks.map((risk, index) => (
          <RiskCard
            key={index}
            {...risk}
          />
        ))}

      </div>

    </div>
  );
}