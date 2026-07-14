import { CircleUserRound, LogOut } from "lucide-react";

export default function SidebarFooter({ collapsed }) {
  return (
    <div
      className="
      border-t
      border-slate-700
      p-4
      "
    >
      {!collapsed ? (
        <div className="flex items-center justify-between rounded-2xl p- transition-all duration-300 hover:bg-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-orange-400
              to-orange-600
              shadow-lg
              "
            >
              <CircleUserRound size={22} className="text-white" />
            </div>

            <div>
              <p className="font-semibold text-white">کیان وکیلی</p>

              <p className="text-xs text-slate-400">مدیر پروژه</p>
            </div>
          </div>

          <button
            className="
            rounded-xl
            p-2
            text-slate-400
            transition
            hover:bg-slate-700
            hover:text-red-400
            "
          >
            <LogOut size={18} />
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-orange-400
            to-orange-600
            shadow-lg
            "
          >
            <CircleUserRound size={22} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
