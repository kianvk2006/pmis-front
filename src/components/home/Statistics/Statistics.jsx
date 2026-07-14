import StatisticCard from "./StatisticCard";
import { statistics } from "@/mocks/home";

export default function Statistics() {
  return (
    <section className="grid grid-cols-4 gap-4">
      {statistics.map((item) => (
        <StatisticCard
          key={item.title}
          {...item}
        />
      ))}
    </section>
  );
}