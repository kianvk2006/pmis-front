import MilestoneItem from "./MilestoneItem";

const milestones = [
  {
    title: "شروع پروژه",
    date: "1403/01/10",
    status: "done",
  },

  {
    title: "اتمام فاز عمرانی",
    date: "1404/06/15",
    status: "done",
  },

  {
    title: "شروع نصب تجهیزات",
    date: "1405/03/01",
    status: "current",
  },

  {
    title: "راه‌اندازی آزمایشی",
    date: "1406/02/20",
    status: "upcoming",
  },

  {
    title: "افتتاح پروژه",
    date: "1406/08/01",
    status: "upcoming",
  },
];

export default function ExecutiveMilestones() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-8 text-xl font-bold">نقاط عطف پروژه</h3>

      <div>
        {milestones.map((item, index) => (
          <MilestoneItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
