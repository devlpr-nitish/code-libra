import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden relative">

            {/* Background Gradients/Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Dotted Pattern Background (simplified) */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-8 p-4">

                {/* Animated 404 Graphic */}
                <div className="relative">
                    {/* Using a text representation since we can't load the exact SVG, 
                styling it to look cool and similar  */}
                    <h1 className="text-[150px] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10 select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        404
                    </h1>

                    {/* Spinning ring effect mimicking the image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-dashed border-indigo-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
                </div>

                <div className="space-y-4 max-w-md">
                    <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
                    <p className="text-muted-foreground text-lg">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                </div>

                <Link href="/">
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-1"
                    >
                        Back To Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
