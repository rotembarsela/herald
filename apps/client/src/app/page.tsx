import { Typography } from "@herald/ui/components/typography";

export default function Home() {
  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Typography variant="p" className="text-yellow-500">
          Hello
        </Typography>
      </div>
    </main>
  );
}
