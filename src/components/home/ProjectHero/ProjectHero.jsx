import Card from "@/components/ui/Card";
import HeroToolbar from "./HeroToolbar";
import HeroHeader from "./HeroHeader";
import HeroInfoGrid from "./HeroInfoGrid";
import HeroProgress from "./HeroProgress";

export default function ProjectHero() {
  return (
    <Card className="overflow-hidden p-0">
      <HeroToolbar />

      <HeroHeader />

      <HeroInfoGrid />

      <HeroProgress />
    </Card>
  );
}