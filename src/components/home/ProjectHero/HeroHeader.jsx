import Typography from "@/components/ui/Typography";
import { project } from "@/mocks/home";
import ProjectStatus from "./ProjectStatus";

export default function HeroHeader() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
      <div className="space-y-4">

    <ProjectStatus />

    <Typography
        as="h1"
        variant="h2"
    >
        {project.title}
    </Typography>

    <Typography
        variant="body"
        className="text-slate-500"
    >
        {project.subtitle}
    </Typography>

</div>

      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500 text-4xl shadow-lg">
        🚆
      </div>
    </div>
  );
}
