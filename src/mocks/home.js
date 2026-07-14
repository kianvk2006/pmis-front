import {
  Building2,
  CalendarDays,
  CircleDollarSign,
  HardHat,
  Activity,
  Users,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export const project = {
  title: "پروژه قطار برقی گلبهار مشهد",
  subtitle: "سامانه مدیریت پروژه‌های عمرانی",
  progress: 38,
};

export const projectInfo = [
  {
    label: "کارفرما",
    value: "شرکت عمران شهرهای جدید",
  },
  {
    label: "پیمانکار",
    value: "شرکت سابیر بین‌الملل",
  },
  // {
  //   label: "بودجه",
  //   value: "700 میلیارد تومان",
  // },
  {
    label: "تاریخ شروع",
    value: "۱۴۰۴/۰۳/۰۱",
  },
  {
    label: "مدت قرارداد",
    value: "۳۶ ماه",
  },
  // {
  //   label: "درصد پیشرفت",
  //   value: "۳۸٪",
  // },
];

export const statistics = [
  {
    title: "مدت پروژه",
    value: "۳۶ ماه",
    icon: CalendarDays,
    color: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "پرسنل",
    value: "۱۲۰۰ نفر",
    icon: Users,
    color: "text-cyan-600",
    iconBg: "bg-cyan-100",
  },
  {
    title: "پیشرفت کل",
    value: "۷۸٪",
    icon: TrendingUp,
    color: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    title: "بودجه",
    value: "700 میلیارد",
    icon: CircleDollarSign,
    color: "text-orange-600",
    iconBg: "bg-orange-100",
  },
];

export const milestones = [
  {
    title: "اخذ مجوزهای اجرایی",
    value: 100,
    color: "bg-green-500",
  },
  {
    title: "طراحی مسیر و ایستگاه‌ها",
    value: 100,
    color: "bg-emerald-500",
  },
  {
    title: "عملیات زیرسازی مسیر",
    value: 65,
    color: "bg-orange-500",
  },
  {
    title: "نصب ریل و تجهیزات برقی",
    value: 30,
    color: "bg-blue-500",
  },
  {
    title: "راه‌اندازی و تست نهایی",
    value: 5,
    color: "bg-slate-500",
  },
];

export const statusItems = [
  {
    icon: Activity,
    label: "وضعیت پروژه",
    value: "در حال اجرا",
    color: "text-green-600",
  },
  {
    icon: CalendarDays,
    label: "آخرین بروزرسانی",
    value: "امروز",
    color: "text-blue-600",
  },
  {
    icon: AlertTriangle,
    label: "ریسک‌های فعال",
    value: "۲",
    color: "text-orange-600",
  },
  {
    icon: Users,
    label: "پرسنل فعال",
    value: "۲۴۵",
    color: "text-violet-600",
  },
];