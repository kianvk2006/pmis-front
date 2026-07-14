import Typography from "@/components/ui/Typography";
import ProgressBar from "./ProgressBar";

export default function MilestoneItem({
  title,
  value,
  color,
}) {
  return (
    <div>
      <div className="flex items-center justify-between">

        <Typography className="font-medium">
          {title}
        </Typography>

        <Typography variant="small">
          {value}%
        </Typography>

      </div>

      <ProgressBar
        value={value}
        color={color}
      />
    </div>
  );
}