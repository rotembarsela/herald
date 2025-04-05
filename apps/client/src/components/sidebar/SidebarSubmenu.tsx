import Link from "next/link";
import { SideBarItem } from "../../constants";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: SideBarItem[];
  currentPath: string;
};

export default function SidebarSubmenu({ children, currentPath }: Props) {
  return (
    <ul className="mr-6 my-1 space-y-1 text-sm">
      {children.map((child) => {
        const isActive = currentPath === child.path;
        return (
          <li key={child.path}>
            <Link
              href={child.path}
              className={cn(
                "block px-2 py-1 rounded hover:text-neutral-800 dark:hover:text-white",
                isActive
                  ? "text-white font-semibold"
                  : "text-neutral-500 dark:text-neutral-400"
              )}
            >
              {child.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
