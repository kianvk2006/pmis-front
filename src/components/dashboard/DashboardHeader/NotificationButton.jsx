import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <button
      className="
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        bg-slate-100
        transition-all
        hover:bg-slate-200
      "
    >
      <Bell size={20} />

      <span
        className="
          absolute
          right-2
          top-2
          h-2
          w-2
          rounded-full
          bg-red-500
        "
      />
    </button>
  );
}