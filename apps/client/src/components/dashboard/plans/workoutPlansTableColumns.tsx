"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Plan } from "types";

export const workoutPlansTableColumns: ColumnDef<Plan>[] = [
  {
    accessorKey: "name",
    header: "שם התוכנית",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "תאריך יצירה",
  },
  {
    accessorKey: "updatedAt",
    header: "תאריך עדכון אחרון",
  },
];
