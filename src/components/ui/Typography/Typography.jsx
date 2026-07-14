import { cn } from "@/lib/utils";

const variants = {
  h1: "text-4xl font-bold text-slate-900",
  h2: "text-3xl font-bold text-slate-900",
  h3: "text-2xl font-semibold text-slate-900",
  h4: "text-xl font-semibold text-slate-900",

  body: "text-base text-slate-700",

  small: "text-sm text-slate-500",

  caption: "text-xs text-slate-400",
};

export default function Typography({
  as: Component = "p",
  variant = "body",
  className,
  children,
}) {
  return (
    <Component
      className={cn(
        variants[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}