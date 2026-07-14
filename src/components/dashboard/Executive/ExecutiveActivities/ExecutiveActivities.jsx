import ActivityItem from "./ActivityItem";

const activities = [
  {
    title: "تکمیل بتن‌ریزی ایستگاه مرکزی",
    description: "فاز دوم عملیات اجرایی با موفقیت پایان یافت.",
    time: "۱۵ دقیقه پیش",
    type: "success",
  },
  {
    title: "ثبت صورت‌جلسه شماره ۱۲",
    description: "صورت‌جلسه کمیته فنی در سامانه ثبت شد.",
    time: "۱ ساعت پیش",
    type: "document",
  },
  {
    title: "هشدار تأخیر تأمین تجهیزات",
    description: "تحویل تجهیزات برقی ۳ روز تأخیر دارد.",
    time: "۳ ساعت پیش",
    type: "warning",
  },
  {
    title: "در انتظار تأیید صورت وضعیت",
    description: "صورت وضعیت پیمانکار شماره ۴.",
    time: "امروز",
    type: "pending",
  },
];

export default function ExecutiveActivities() {
  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-6
      shadow-sm
      "
    >
      <h3 className="mb-8 text-xl font-bold">
        آخرین فعالیت‌ها
      </h3>

      <div className="space-y-7">

        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            {...activity}
          />
        ))}

      </div>

    </div>
  );
}