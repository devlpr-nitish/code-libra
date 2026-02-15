'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Database, Terminal, Cpu, Globe, Laptop } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromCookie, AuthUser } from '@/lib/cookie-utils';

const floatingIcons = [
    { Icon: Code, color: 'text-blue-500', size: 24, x: '10%', y: '10%', delay: 0 },
    { Icon: Database, color: 'text-green-500', size: 32, x: '90%', y: '20%', delay: 0.5 },
    { Icon: Terminal, color: 'text-yellow-500', size: 28, x: '5%', y: '60%', delay: 1 },
    { Icon: Laptop, color: 'text-purple-500', size: 30, x: '95%', y: '50%', delay: 1.5 },
    { Icon: Globe, color: 'text-cyan-500', size: 26, x: '15%', y: '85%', delay: 2 },
    { Icon: Cpu, color: 'text-red-500', size: 24, x: '85%', y: '80%', delay: 2.5 },
];

export default function HeroHeader() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
    const [usernameInput, setUsernameInput] = useState('');

    useEffect(() => {
        const user = getUserFromCookie();
        setCurrentUser(user);
    }, []);

    const handleAction = () => {
        if (!usernameInput.trim()) return;

        if (currentUser) {
            // If logged in, go to compare page
            router.push(`/compare-profile?u1=${currentUser.username}&u2=${usernameInput}`);
        } else {
            // If not logged in, go to login page with username query param
            router.push(`/login?username=${usernameInput}`);
        }
    };

    return (
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-6 pt-20 md:pt-32 pb-12 z-20 relative min-h-[600px] justify-center">
            {/* Floating Icons Background */}
            <div className="absolute inset-0 overflow-visible pointer-events-none">
                {floatingIcons.map((icon, index) => (
                    <motion.div
                        key={index}
                        className={`absolute ${icon.color} opacity-20 dark:opacity-30`}
                        style={{ left: icon.x, top: icon.y }}
                        initial={{ y: 0, opacity: 0 }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            delay: icon.delay,
                            ease: "easeInOut",
                        }}
                    >
                        <icon.Icon size={icon.size} />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-foreground text-xs md:text-sm font-medium mb-6 relative z-10"
            >
                <Sparkles size={14} className='text-orange-500 dark:text-orange-400' />
                <span>Welcome To CodeLibra</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight relative z-10"
            >
                Track Your <span className="text-muted-foreground font-serif italic">Coding Journey</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed relative z-10"
            >
                Analyze Leetcode profiles, filter contest-wise questions, get personalized topic recommendations based on your data. Compare profiles and share your achievements on social media.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center relative z-10"
            >
                <div className="relative group w-full max-w-sm">
                    <div className="absolute -inset-0.5 bg-foreground rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex items-center bg-card rounded-lg p-1 pr-1 border border-border">
                        <input
                            type="text"
                            placeholder="Enter leetcode username"
                            className="w-full bg-transparent text-foreground px-4 py-3 outline-none placeholder:text-muted-foreground"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                        />
                        <button
                            onClick={handleAction}
                            className="bg-foreground cursor-pointer hover:bg-foreground/90 text-background font-semibold px-6 py-3 rounded-md transition-colors whitespace-nowrap"
                        >
                            {currentUser ? 'Compare' : 'Get Started'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
