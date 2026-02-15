import Hero from "@/components/Hero";
import ContestPreview from "@/components/ContestPreview";
import WeeklyGoalsPreview from "@/components/WeeklyGoalsPreview";
import SectionSeparator from "@/components/SectionSeparator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <SectionSeparator />
      <ContestPreview />
      <SectionSeparator />
      <WeeklyGoalsPreview />
    </main>
  );
}
