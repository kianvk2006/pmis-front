import { NavLink } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function SidebarItem({
  title,
  icon: Icon,
  path,
  badge,
  collapsed,
}) {
  return (
    <NavLink
      to={path}
      title={collapsed ? title : ""}
      className={({ isActive }) =>
        `
        group
        relative
        flex
        items-center
        ${collapsed ? "justify-center" : "justify-between"}
        rounded-2xl
        px-4
        py-3
        transition-all
        duration-300
        ease-in-out

        ${
          isActive
            ? `
              border-r-4
              border-orange-500
              bg-gradient-to-l
              from-orange-500/20
              to-transparent
              text-orange-400
              shadow-lg
            `
            : `
              text-slate-300
              hover:bg-slate-700/60
              hover:text-white
              hover:translate-x-1
            `
        }
        `
      }
    >
      {collapsed ? (
        <Icon size={22} strokeWidth={2} />
      ) : (
        <>
          {/* سمت راست */}
          <div className="flex items-center gap-3">
            <Icon size={20} strokeWidth={2} />

            <span
              className="
              text-[15px]
              font-semibold
              "
            >
              {title}
            </span>
          </div>

          {/* سمت چپ */}
          <div className="flex items-center gap-2">
            {badge && (
              <span
                className="
                rounded-full
                bg-red-500
                px-2
                py-0.5
                text-xs
                text-white
                "
              >
                {badge}
              </span>
            )}

            <ChevronLeft
              size={16}
              className="
              opacity-0
              transition-all
              duration-300
              group-hover:opacity-100
              "
            />
          </div>
        </>
      )}
    </NavLink>
  );
}
