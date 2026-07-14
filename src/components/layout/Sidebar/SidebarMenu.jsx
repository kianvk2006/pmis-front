import SidebarSection from "./SidebarSection";
import { sidebarSections } from "./sidebarData";

export default function SidebarMenu({ collapsed }) {
  return (
    <nav
      className="
      sidebar-scroll
      flex-1
      overflow-y-auto
      px-4
      py-6
      "
    >
      {sidebarSections.map((section) => (
        <SidebarSection
          key={section.title}
          title={section.title}
          items={section.items}
          collapsed={collapsed}
        />
      ))}
    </nav>
  );
}