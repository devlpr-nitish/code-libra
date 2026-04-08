import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Profiles – CodeLibra",
  description:
    "Compare two LeetCode profiles head-to-head. Analyze contest ratings, problem-solving stats, activity heatmaps, language usage, and badges to see who comes out on top.",
};

export default function CompareProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
