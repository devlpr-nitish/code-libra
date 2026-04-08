import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile – CodeLibra",
  description:
    "View a detailed LeetCode user profile on CodeLibra. Explore contest rating history, submission heatmap, solved problem breakdown, language stats, and earned badges.",
};

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
