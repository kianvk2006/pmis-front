import {
  LayoutDashboard,
  BriefcaseBusiness,
  TrendingUp,
  HardHat,
  Boxes,
  Building2,
  Construction,
  ClipboardList,
  CalendarRange,
  CheckSquare,
  MessageSquare,
  Bell,
  Images,
  BanknoteArrowUp,
  Layers3,
  BarChart3,
  Settings,
} from "lucide-react";

export const sidebarSections = [
  {
    title: "اصلی",
    items: [
      {
        title: "داشبورد",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        title: "مدیریت اجرایی",
        icon: BriefcaseBusiness,
        path: "/dashboard/executive",
      },
      {
        title: "EVM / ارزش کسب‌شده",
        icon: TrendingUp,
        path: "/dashboard/evm",
      },
    ],
  },

  {
    title: "عملیات پروژه",
    items: [
      {
        title: "اجرای عملیات",
        icon: HardHat,
        path: "/dashboard/execution",
      },
      {
        title: "مصالح و تجهیزات",
        icon: Boxes,
        path: "/dashboard/materials",
      },
      {
        title: "داشبورد کارفرما",
        icon: Building2,
        path: "/dashboard/client",
      },
      {
        title: "داشبورد کارگاه",
        icon: Construction,
        path: "/dashboard/site",
      },
      {
        title: "گزارش‌های کارگاه",
        icon: ClipboardList,
        path: "/dashboard/site-reports",
      },
      {
        title: "زمان‌بندی گانت",
        icon: CalendarRange,
        path: "/dashboard/gantt",
      },
    ],
  },

  {
    title: "همکاری",
    items: [
      {
        title: "وظایف",
        icon: CheckSquare,
        path: "/dashboard/tasks",
      },
      {
        title: "چت داخلی",
        icon: MessageSquare,
        path: "/dashboard/chat",
      },
      {
        title: "اطلاع‌رسانی",
        icon: Bell,
        path: "/dashboard/notifications",
      },
      {
        title: "گالری پروژه",
        icon: Images,
        path: "/dashboard/gallery",
      },
    ],
  },

  {
    title: "مدیریت",
    items: [
      {
        title: "جریان نقدینگی",
        icon: BanknoteArrowUp,
        path: "/dashboard/cashflow",
      },
      {
        title: "فرم‌ساز",
        icon: Layers3,
        path: "/dashboard/forms",
      },
      {
        title: "گزارشات",
        icon: BarChart3,
        path: "/dashboard/reports",
      },
      {
        title: "تنظیمات",
        icon: Settings,
        path: "/dashboard/settings",
      },
    ],
  },
];
