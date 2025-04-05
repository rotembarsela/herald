"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SIDEBAR_ITEMS, SideBarItem } from "../../constants";
import { cn } from "@/lib/utils/cn";
import { useEffect, useState, MouseEvent } from "react";
import { Icon } from "@iconify/react";
import SidebarSubmenu from "./SidebarSubmenu";

export default function SidebarNav() {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updated: Record<string, boolean> = {};
    for (const item of SIDEBAR_ITEMS) {
      if (item.submenu && item.children?.length) {
        const isChildActive =
          item.children.some((child) => pathname.startsWith(child.path)) &&
          pathname !== item.path;
        if (isChildActive) {
          updated[item.path] = true;
        }
      }
    }
    setOpenSubmenus(updated);
  }, [pathname]);

  const handleSubmenuToggle = (e: MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubmenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const renderSidebarItem = (item: SideBarItem) => {
    const hasSubmenu = item.submenu && item.children?.length;
    const isExactMatch = pathname === item.path;
    const isChildMatch = item.children?.some((c) =>
      pathname.startsWith(c.path)
    );
    const isActive = isExactMatch || isChildMatch;
    const isOpen = !!openSubmenus[item.path];

    const linkClassName = cn(
      "group flex items-center rounded-md text-sm font-medium transition-colors h-10 px-2",
      isActive
        ? "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-white"
        : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
    );

    const link = (
      <Link href={item.path} className={linkClassName}>
        <div className="w-6 h-6 shrink-0 flex justify-start items-center">
          {item.icon}
        </div>
        <span className="ml-2 truncate">{item.title}</span>
      </Link>
    );

    return (
      <li key={item.path}>
        <div className="relative">
          {link}
          {hasSubmenu && (
            <button
              onClick={(e) => handleSubmenuToggle(e, item.path)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
              aria-label="Toggle submenu"
              aria-expanded={isOpen}
            >
              <Icon
                icon="lucide:chevron-down"
                className={cn("transition-transform", isOpen && "rotate-180")}
                width={16}
                height={16}
              />
            </button>
          )}
        </div>

        {isOpen && item.children && (
          <SidebarSubmenu currentPath={pathname}>
            {item.children}
          </SidebarSubmenu>
        )}
      </li>
    );
  };

  return (
    <nav className="mt-4 pb-2 space-y-5">
      <ul className="flex flex-col space-y-1">
        {SIDEBAR_ITEMS.map(renderSidebarItem)}
      </ul>
    </nav>
  );
}
