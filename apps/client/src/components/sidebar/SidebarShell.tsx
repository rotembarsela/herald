"use client";

import SidebarNav from "./SidebarNav";

export default function SidebarShell() {
  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-[168px] border-l shrink-0 block">
      <div className="flex flex-col h-full w-full px-4 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>
  );
}
