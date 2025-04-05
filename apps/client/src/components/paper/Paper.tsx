import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface PaperProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Paper({
  title,
  icon,
  children,
  className,
}: PaperProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl p-6 bg-background border dark:border-white",
        className
      )}
    >
      {(icon || title) && (
        <div className="flex justify-start text-right mb-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
            {icon && <span className="text-2xl">{icon}</span>}
            {title && <span>{title}</span>}
          </div>
        </div>
      )}
      <div className="flex-1 text-right text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
