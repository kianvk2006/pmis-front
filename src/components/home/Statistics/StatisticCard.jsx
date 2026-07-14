import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export default function StatisticCard({
  title,
  value,
  icon: Icon,
  color,
  iconBg,
}) {
  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Typography
            variant="small"
            className="text-slate-500"
          >
            {title}
          </Typography>

          <Typography
            as="h3"
            variant="h3"
            className="font-bold text-slate-900"
          >
            {value}
          </Typography>
        </div>

        {Icon && (
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110",
              iconBg
            )}
          >
            <Icon
              size={26}
              className={color}
            />
          </div>
        )}
      </div>
    </Card>
  );
}