import Typography from "@/components/ui/Typography";

export default function TimelineItem({
  title,
  date,
  completed = false,
  last = false,
}) {
  return (
    <div className="relative flex gap-2">
      {/* خط عمودی */}
      {!last && (
        <div className="absolute right-[15px] top-8 h-full w-[2px] bg-slate-200" />
      )}

      {/* دایره */}
      <div
        className={`z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
          completed
            ? "border-orange-500 bg-orange-500 text-white"
            : "border-slate-300 bg-white"
        }`}
      >
        {completed ? "✓" : ""}
      </div>

      {/* متن */}
      <div className="pb-5">
        <Typography className="font-semibold">
          {title}
        </Typography>

        <Typography variant="small">
          {date}
        </Typography>
      </div>
    </div>
  );
}