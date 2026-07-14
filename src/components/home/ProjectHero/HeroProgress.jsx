import Typography from "@/components/ui/Typography";
import { project } from "@/mocks/home";

export default function HeroProgress() {
  return (
    <div className="border-t border-slate-200 px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <Typography className="font-medium text-slate-700">
          میزان پیشرفت پروژه
        </Typography>

        <Typography className="font-bold text-orange-500">
          {project.progress}%
        </Typography>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-700"
          style={{
            width: `${project.progress}%`,
          }}
        />
      </div>

      <div className="mt-3 flex justify-between text-xs text-slate-500">
        <span>شروع پروژه</span>
        <span>بهره‌برداری</span>
      </div>
    </div>
  );
}
