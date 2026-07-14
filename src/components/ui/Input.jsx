import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(function Input(
  {
    className,
    type = "text",
    ...props
  },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        `
        h-14
        w-full
        rounded-2xl
        border
        border-slate-600
        bg-slate-700/80
        px-5
        text-white
        placeholder:text-slate-400
        outline-none
        transition-all
        duration-300
        focus:border-orange-500
        focus:ring-4
        focus:ring-orange-500/20
      `,
        className
      )}
      {...props}
    />
  );
});

export default Input;