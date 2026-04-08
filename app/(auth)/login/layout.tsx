import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login – CodeLibra",
  description:
    "Sign in to CodeLibra to access your personalized LeetCode analytics dashboard, track your contest performance, and compare your coding profile with others.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
