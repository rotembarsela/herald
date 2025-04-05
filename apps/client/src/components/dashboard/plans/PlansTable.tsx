"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";

type PlansTableProps<TData> = {
  title: string;
  viewAllHref?: string;
  viewAllTitle?: string;
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  rowClickPath?: (row: TData) => string;
};

export function PlansTable<TData>(props: PlansTableProps<TData>) {
  const {
    title,
    viewAllHref,
    viewAllTitle = "לצפייה בהכל",
    columns,
    data,
    rowClickPath,
  } = props;

  const router = useRouter();

  return (
    <div className="container mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            {viewAllTitle}
            <Icon
              icon="lucide:chevron-left"
              width={14}
              height={14}
              className="group-hover:underline"
            />
          </Link>
        )}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        onRowClick={
          rowClickPath
            ? (row) => {
                router.push(rowClickPath(row));
              }
            : undefined
        }
      />
    </div>
  );
}
