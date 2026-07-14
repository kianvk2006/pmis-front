import { cn } from "@/lib/utils";

export default function Input({
  className,
  type = "text",
  ...props
}) {
  return (
    <input
      type={type}
      className={cn(
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition-all",
        "focus:border-orange-500 focus:ring-4 focus:ring-orange-100",
        "placeholder:text-slate-400",
        className
      )}
      {...props}
    />
  );
}