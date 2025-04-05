"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarProps,
} from "recharts";
import { ReactNode } from "react";

interface ChartCardProps<T = Record<string, unknown>> {
  data: T[];
  xKey?: string;
  yKey: string;
  reversed?: boolean;
  height?: number;
  barProps?: Omit<BarProps, "ref" | "dataKey">;
  className?: string;
  children?: ReactNode;
  tooltipLabel?: string;
}

export default function ChartCard<T>({
  data,
  xKey = "name",
  yKey,
  reversed = false,
  height = 250,
  barProps,
  className,
  children,
  tooltipLabel,
}: ChartCardProps<T>) {
  return (
    <div className={className}>
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} reversed={reversed} />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name === yKey) return [value, tooltipLabel || name];
                return [value, name];
              }}
            />
            {children || <Bar {...barProps} dataKey={yKey} />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
