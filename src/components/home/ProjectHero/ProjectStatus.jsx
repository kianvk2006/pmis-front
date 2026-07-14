import { BadgeCheck } from "lucide-react";

export default function ProjectStatus() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-2 py-1">

      <BadgeCheck
        size={18}
        className="text-green-600"
      />

      <span className="text-sm font-medium text-green-700">
        پروژه فعال
      </span>

    </div>
  );
}