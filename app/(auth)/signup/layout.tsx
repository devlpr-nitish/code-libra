import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up – CodeLibra",
  description:
    "Create a free CodeLibra account using your LeetCode username. Unlock personalized analytics, contest rating graphs, profile comparisons, and weekly practice goals.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
