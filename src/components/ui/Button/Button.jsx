import { cn } from "@/lib/utils";

export default function Button({
  children,
  loading = false,
  className,
  ...props
}) {
  return (
    <button
      disabled={loading}
      className={cn(
        `
        flex
        h-14
        w-full
        items-center
        justify-center
        rounded-2xl
        bg-orange-500
        font-bold
        text-white
        transition-all
        hover:bg-orange-600
        active:scale-95
        disabled:opacity-60
      `,
        className
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}