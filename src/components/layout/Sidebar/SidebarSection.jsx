import SidebarItem from "./SidebarItem";

export default function SidebarSection({
  title,
  items,
  collapsed,
}) {
  return (
    <section className="mb-8">

      {/* عنوان گروه */}
      {!collapsed && (
        <div
          className="
          mb-3
          px-3
          "
        >
          <span
            className="
            text-[11px]
            font-bold
            uppercase
            tracking-widest
            text-slate-500
            "
          >
            {title}
          </span>
        </div>
      )}

      {/* آیتم‌های گروه */}
      <div className="space-y-1">

        {items.map((item) => (
          <SidebarItem
            key={item.path}
            collapsed={collapsed}
            {...item}
          />
        ))}

      </div>

    </section>
  );
}