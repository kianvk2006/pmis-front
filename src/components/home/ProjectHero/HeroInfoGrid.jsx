import Typography from "@/components/ui/Typography";
import { projectInfo } from "@/mocks/home";

export default function HeroInfoGrid() {
  return (
    <div className="grid grid-cols-4 gap-6 p-5">
      {projectInfo.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50"
        >
          <Typography
            variant="small"
            className="text-slate-500"
          >
            {item.label}
          </Typography>

          <Typography
            className="mt-2 font-semibold text-slate-800"
          >
            {item.value}
          </Typography>
        </div>
      ))}
    </div>
  );
}