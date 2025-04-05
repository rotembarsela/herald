import { JSX } from "react";
import { Icon } from "@iconify/react";

// user profile
const DASHBOARD_PREFIX = "/dashboard";

export type SideBarItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  children?: SideBarItem[];
};

export const SIDEBAR_ITEMS: SideBarItem[] = [
  {
    title: "ראשי",
    path: DASHBOARD_PREFIX,
    icon: <Icon icon="lucide:home" width="14" height="14" />,
  },
  {
    title: "תוכניות",
    path: `${DASHBOARD_PREFIX}/plans`,
    icon: <Icon icon="lucide:folder" width="14" height="14" />,
    submenu: true,
    children: [
      { title: "תוכניות אימון", path: `${DASHBOARD_PREFIX}/plans/workout` },
      { title: "המלצות תזונה", path: `${DASHBOARD_PREFIX}/plans/nutrition` },
    ],
  },
  {
    title: "הגדרות",
    path: `${DASHBOARD_PREFIX}/settings`,
    icon: <Icon icon="lucide:settings" width="14" height="14" />,
    submenu: true,
    children: [
      { title: "משתמש", path: `${DASHBOARD_PREFIX}/settings/account` },
      { title: "מדיניות פרטיות", path: `${DASHBOARD_PREFIX}/settings/privacy` },
    ],
  },
  {
    title: "יצירת קשר",
    path: "/contact",
    icon: <Icon icon="lucide:help-circle" width="14" height="14" />,
  },
];
