"use client";

import { Plan } from "types";
import { nutritiontPlansTableColumns } from "./nutritionPlansTableColumns";
import { PlansTable } from "./PlansTable";
import { workoutPlansTableColumns } from "./workoutPlansTableColumns";
import Paper from "@/components/paper/Paper";

const workoutPlans: Plan[] = [
  {
    name: "היפרטרופיה שלב 1",
    createdAt: "2025-03-01",
    updatedAt: "2025-04-01",
  },
  {
    name: "הכנה לכוח",
    createdAt: "2025-01-15",
    updatedAt: "2025-02-12",
  },
];

const nutritionPlans: Plan[] = [
  {
    name: "תפריט התחלתי",
    createdAt: "2025-03-01",
    updatedAt: "2025-04-01",
  },
  {
    name: "תפריט חיטוב",
    createdAt: "2025-01-15",
    updatedAt: "2025-02-12",
  },
];

export default function Plans() {
  return (
    <Paper>
      <div className="space-y-6">
        <PlansTable
          title="תוכניות אימון אחרונות 💪"
          viewAllHref="/dashboard/workouts"
          columns={workoutPlansTableColumns}
          data={workoutPlans}
          rowClickPath={(row) => `/dashboard/workouts/${row.name}`}
        />
        <PlansTable
          title="המלצות תזונה אחרונות 🥦"
          viewAllHref="/dashboard/nutritions"
          columns={nutritiontPlansTableColumns}
          data={nutritionPlans}
        />
      </div>
    </Paper>
  );
}
