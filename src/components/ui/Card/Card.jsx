import { cn } from "@/lib/utils";

export default function Card({
  children,
  className,
}) {
  return (
    <div
      className={cn(
        `
        rounded-3xl
        border
        border-slate-200/70
        bg-white/90
        backdrop-blur-md
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:shadow-xl
        `,
        className
      )}
    >
      {children}
    </div>
  );
}