import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ContestPreview from "@/components/ContestPreview";
import WeeklyGoalsPreview from "@/components/WeeklyGoalsPreview";
import SectionSeparator from "@/components/SectionSeparator";

export const metadata: Metadata = {
  title: "CodeLibra – LeetCode Analytics & Profile Insights",
  description:
    "CodeLibra is your all-in-one LeetCode analytics platform. Track contest ratings, visualize submission heatmaps, compare profiles side-by-side, and discover your coding strengths.",
};

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
