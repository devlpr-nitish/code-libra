"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage =
        pathname?.startsWith("/signup") ||
        pathname?.startsWith("/signin") ||
        pathname?.startsWith("/login");

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {!isAuthPage && <Navbar />}
            {children}
            <Toaster />
        </ThemeProvider>
    );
}
