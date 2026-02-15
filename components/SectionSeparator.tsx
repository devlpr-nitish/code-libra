import { cn } from "@/lib/utils";

export default function SectionSeparator() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-50 my-8">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-border shadow-[0_0_10px_2px_rgba(var(--primary),0.3)]"></div>
            </div>
        </div>
    );
}
