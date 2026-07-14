import { Building2 } from "lucide-react";
import SidebarCollapse from "./SidebarCollapse";

export default function SidebarHeader({ collapsed, setCollapsed }) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      border-b
      border-slate-700
      px-5
      py-6
      "
    >
      {/* اطلاعات سیستم */}
      {!collapsed && (
        <div className="flex items-center gap-3">
          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-orange-400
            to-orange-600
            shadow-lg
            "
          >
            <Building2 size={24} className="text-white" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">PMIS</h2>

            <p className="text-sm text-slate-400">مدیریت پروژه</p>
          </div>
        </div>
      )}

      {/* حالت Collapse */}
      {collapsed && (
        <div
          className="
          flex
          w-full
          justify-center
          "
        >
          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-orange-400
            to-orange-600
            shadow-lg
            "
          >
            <Building2 size={24} className="text-white" />
          </div>
        </div>
      )}

      {/* دکمه باز و بسته شدن */}
      <div className={collapsed ? "absolute top-5 left-5" : ""}>
        <SidebarCollapse collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </div>
  );
}
