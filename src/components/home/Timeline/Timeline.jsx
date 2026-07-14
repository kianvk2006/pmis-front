import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import TimelineItem from "./TimelineItem";

const items = [
  {
    title: "شروع پروژه",
    date: "1405/01/15",
    completed: true,
  },
  {
    title: "اتمام طراحی",
    date: "1405/03/20",
    completed: true,
  },
  {
    title: "شروع اجرا",
    date: "1405/06/10",
    completed: false,
  },
  {
    title: "تحویل نهایی",
    date: "1407/12/20",
    completed: false,
  },
];

export default function Timeline() {
  return (
    <Card>

      <Typography
        as="h3"
        variant="h3"
        className="mb-8"
      >
        روند اجرای پروژه
      </Typography>

      {items.map((item, index) => (
        <TimelineItem
          key={item.title}
          {...item}
          last={index === items.length - 1}
        />
      ))}

    </Card>
  );
}