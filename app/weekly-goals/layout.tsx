import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Goals – CodeLibra",
  description:
    "Plan and track your weekly LeetCode practice goals. Get a personalized day-by-day problem schedule based on your profile, monitor your progress, and stay consistent.",
};

export default function WeeklyGoalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
