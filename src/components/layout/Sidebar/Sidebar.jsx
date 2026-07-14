import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
    sticky
    right-0
    top-0
    

    flex
    h-screen
    flex-col

    bg-[#111827]
    border-l
    border-slate-700
    shadow-2xl
    transition-all
    duration-300

    ${collapsed ? "w-24" : "w-[300px]"}
  `}
    >
      <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />

      <SidebarMenu collapsed={collapsed} />

      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
}
