import ProjectHero from "./ProjectHero";
import Statistics from "./Statistics";
import Timeline from "./Timeline";

export default function MainContent() {
  return (
    <div className="space-y-6">

      <ProjectHero />

      <Statistics />

      <Timeline />

    </div>
  );
}