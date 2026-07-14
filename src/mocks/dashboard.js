import {
  CircleDollarSign,
  Wallet,
  TrendingUp,
  Users,
  AlertTriangle,
  CalendarClock,
} from "lucide-react";

export const summaryCards = [
  {
    id: 1,
    title: "بودجه پروژه",
    value: "700",
    unit: "میلیارد تومان",
    icon: CircleDollarSign,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
    trend: "+8%",
    positive: true,
  },

//   {
//     id: 2,
//     title: "هزینه انجام شده",
//     value: "۱,۳۸۰",
//     unit: "میلیارد تومان",
//     icon: Wallet,
//     color: "bg-blue-100",
//     iconColor: "text-blue-600",
//     trend: "+4%",
//     positive: false,
//   },

  {
    id: 3,
    title: "پیشرفت فیزیکی",
    value: "۳۸",
    unit: "درصد",
    icon: TrendingUp,
    color: "bg-green-100",
    iconColor: "text-green-600",
    trend: "+12%",
    positive: true,
  },

  {
    id: 4,
    title: "نیروی انسانی",
    value: "1200",
    unit: "نفر",
    icon: Users,
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
    trend: "+2%",
    positive: true,
  },

  {
    id: 5,
    title: "ریسک‌های باز",
    value: "۲",
    unit: "مورد",
    icon: AlertTriangle,
    color: "bg-red-100",
    iconColor: "text-red-600",
    trend: "-1",
    positive: false,
  },

  {
    id: 6,
    title: "تاخیر برنامه",
    value: "۹",
    unit: "روز",
    icon: CalendarClock,
    color: "bg-violet-100",
    iconColor: "text-violet-600",
    trend: "-3",
    positive: false,
  },
];

export const progressChart = [
  { month: "فروردین", planned: 5, actual: 4 },
  { month: "اردیبهشت", planned: 12, actual: 10 },
  { month: "خرداد", planned: 20, actual: 18 },
  { month: "تیر", planned: 32, actual: 30 },
  { month: "مرداد", planned: 42, actual: 39 },
  { month: "شهریور", planned: 55, actual: 50 },
  { month: "مهر", planned: 68, actual: 61 },
  { month: "آبان", planned: 78, actual: 70 },
];

export const activityDistribution = [
  {
    name: "در حال اجرا",
    value: 48,
    color: "#3B82F6",
  },
  {
    name: "تکمیل شده",
    value: 30,
    color: "#22C55E",
  },
  {
    name: "در انتظار",
    value: 15,
    color: "#F59E0B",
  },
  {
    name: "متوقف",
    value: 7,
    color: "#EF4444",
  },
];

export const todayActivities = [
  {
    id: 1,
    title: "حفاری تونل قطعه شماره ۲",
    time: "08:30",
    status: "completed",
    user: "تیم اجرایی",
  },
  {
    id: 2,
    title: "بتن‌ریزی ایستگاه مرکزی",
    time: "10:15",
    status: "progress",
    user: "واحد عمران",
  },
  {
    id: 3,
    title: "جلسه با کارفرما",
    time: "13:00",
    status: "pending",
    user: "مدیریت پروژه",
  },
  {
    id: 4,
    title: "بازدید ناظر مقیم",
    time: "15:30",
    status: "warning",
    user: "شرکت عمران",
  },
];

export const notifications = [
  {
    id: 1,
    title: "تأیید صورت وضعیت شماره ۱۲",
    description: "کارفرما صورت وضعیت را تأیید کرد.",
    time: "۵ دقیقه پیش",
    type: "success",
  },
  {
    id: 2,
    title: "تأخیر در تأمین ریل",
    description: "تحویل تجهیزات ۳ روز تأخیر دارد.",
    time: "۴۵ دقیقه پیش",
    type: "warning",
  },
  {
    id: 3,
    title: "جلسه کمیته فنی",
    description: "امروز ساعت ۱۵ برگزار می‌شود.",
    time: "۲ ساعت پیش",
    type: "info",
  },
  {
    id: 4,
    title: "ثبت گزارش روزانه",
    description: "گزارش امروز با موفقیت ثبت شد.",
    time: "دیروز",
    type: "success",
  },
];