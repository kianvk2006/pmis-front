import SummaryCard from "./SummaryCard";
import { summaryCards } from "@/mocks/dashboard";

export default function SummaryCards() {
  return (
    <section
      className="
      grid
      gap-10
      md:gap-2
      grid-cols-5
      md:grid-cols-2
      xl:grid-cols-5
      "
    >
      {summaryCards.map((card) => (
        <SummaryCard
          key={card.id}
          {...card}
        />
      ))}
    </section>
  );
}