"use client";

import {
  useFloating,
  offset,
  flip,
  shift,
  Placement,
  autoUpdate,
} from "@floating-ui/react";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: Placement;
  wrapperClassName?: string;
  tooltipClassName?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "right",
  wrapperClassName = "",
  tooltipClassName = "",
}) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, update } = useFloating({
    placement,
    middleware: [offset(10), flip(), shift()],
  });

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) return;
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update]);

  return (
    <div
      ref={refs.setReference}
      className={wrapperClassName}
      onMouseEnter={() => {
        setOpen(true);
        update();
      }}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={tooltipClassName}
        >
          {content}
        </div>
      )}
    </div>
  );
};
