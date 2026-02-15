"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
            <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] flex-col">
                <main className="flex-1 w-full">{children}</main>
            </div>
            {!isAuthPage && <Footer />}
            <Toaster />
        </ThemeProvider>
    );
}
