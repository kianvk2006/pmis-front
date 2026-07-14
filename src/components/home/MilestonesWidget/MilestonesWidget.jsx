import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import MilestoneItem from "./MilestoneItem";

import { milestones } from "@/mocks/home";

export default function MilestonesWidget() {
  return (
    <Card>
      <Typography
        as="h3"
        variant="h3"
        className="mb-6"
      >
        نقاط عطف پروژه
      </Typography>

      <div className="space-y-5">
        {milestones.map((item) => (
          <MilestoneItem
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </Card>
  );
}