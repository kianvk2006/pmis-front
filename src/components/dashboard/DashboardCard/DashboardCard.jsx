import { cn } from "@/lib/utils";

export default function DashboardCard({
  title,
  action,
  children,
  className,
}) {
  return (
    <section
      className={cn(
        `
        rounded-3xl
        bg-white
        border
        border-slate-200
        p-3
        shadow-sm
        `,
        className
      )}
    >
      {(title || action) && (
        <header className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">
            {title}
          </h3>

          {action}
        </header>
      )}

      {children}
    </section>
  );
}