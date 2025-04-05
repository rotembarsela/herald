import Paper from "@/components/paper/Paper";
import ChartCard from "@/components/chart/ChartCard";
import Greeting from "@/components/dashboard/Greeting ";
import Plans from "@/components/dashboard/plans/Plans";
import { mocks } from "mocks";

const weekDaysWorkouts = [
  { day: "ראשון", workoutCount: 1 },
  { day: "שני", workoutCount: 0 },
  { day: "שלישי", workoutCount: 0 },
  { day: "רביעי", workoutCount: 2 },
  { day: "חמישי", workoutCount: 1 },
  { day: "שישי", workoutCount: 0 },
  { day: "שבת", workoutCount: 1 },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Greeting name={mocks.user.name} />
      <Plans />
      <Paper title="אימונים השבוע" className="w-full">
        <ChartCard
          data={weekDaysWorkouts}
          xKey="day"
          yKey="workoutCount"
          reversed
          barProps={{ fill: "#22c55e", radius: [4, 4, 0, 0] }}
          className="w-1/2"
          tooltipLabel="אימון"
        />
      </Paper>
      <Paper title="בדיקה" className="w-full">
        בדיקה
      </Paper>
      <Paper title="בדיקה" className="w-full">
        בדיקה
      </Paper>
    </div>
  );
}
