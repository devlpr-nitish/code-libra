'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { loginUser } from '@/actions/auth-user';
import { useRouter, useSearchParams } from 'next/navigation'; // Keep import for UrlParamHandler but not needed here? No, I need it for the sub-component.
import { toast } from 'sonner';
import { setCookie, getUserFromCookie } from '@/lib/cookie-utils';

function UrlParamHandler({ setIdentifier }: { setIdentifier: (value: string) => void }) {
    const searchParams = useSearchParams();
    useEffect(() => {
        const usernameParam = searchParams.get('username');
        if (usernameParam) {
            setIdentifier(usernameParam);
        }
    }, [searchParams, setIdentifier]);
    return null;
}

const featureShowcase = [
    {
        caption: 'Compare real LeetCode profiles',
        image: '/auth-compare-image.png'
    },
    {
        caption: 'See your profile value score',
        image: '/hero-image-dark.png'
    },
    {
        caption: 'All Contest Questions',
        image: '/contest-page.png'
    },
    {
        caption: 'Stay consistent with weekly goals',
        image: '/weekly-goals.png'
    },
];

export default function LoginPage() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
        const user = getUserFromCookie();
        if (user && user.username) {
            router.push(`/user/${user.username}`);
        }
    }, [router]);

    // Auto-change images every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % featureShowcase.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const isFormValid = identifier.length > 0 && password.length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);

        try {
            const data = await loginUser({ identifier, password });

            if (data.token) {
                // Decode JWT to get username
                try {
                    const base64Url = data.token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    const payload = JSON.parse(jsonPayload);
                    const username = payload.username;

                    if (username) {
                        // Save username to cookie for 7 days
                        setCookie('leetcode_user', username, 7);
                        toast.success(`Welcome back, ${username}!`);
                        router.push(`/user/${username}`);
                    } else {
                        toast.error('Could not retrieve username from token.');
                    }
                } catch (decodeError) {
                    console.error('Token decoding failed:', decodeError);
                    toast.error('Failed to process login token.');
                }
            } else {
                toast.error('Login successful but no token received.');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Invalid credentials. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col lg:flex-row relative overflow-hidden" style={{ backgroundImage: "url('/auth_bg_orange.png')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-0 pointer-events-none"></div>

            {/* LEFT SECTION - Login Form */}
            <div className="w-full lg:w-[40%] flex items-center justify-center p-8 relative z-10 h-full min-h-screen overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="relative">
                        {/* Glassmorphic card */}
                        <div className="relative backdrop-blur-xl bg-orange-500/10 dark:bg-orange-950/30 border border-orange-200/20 dark:border-orange-700/20 rounded-3xl p-8 shadow-2xl">
                            {/* Logo/Brand */}
                            <Suspense fallback={null}>
                                <UrlParamHandler setIdentifier={setIdentifier} />
                            </Suspense>
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-white mb-2">
                                    Welcome back to <span className="text-orange-500 dark:text-orange-400 decoration-2 decoration-orange-500/50">CodeLibra</span>
                                </h1>
                                <p className="text-gray-200 text-sm">
                                    Sign in to continue analyzing your coding journey.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Identifier Field */}
                                <div>
                                    <label htmlFor="identifier" className="block text-sm font-medium text-white mb-2">
                                        Email or Username
                                    </label>
                                    <input
                                        id="identifier"
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        placeholder="Email or Username"
                                        className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-orange-500/50 focus:bg-white/20 transition-all"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-white">
                                            Password
                                        </label>
                                        <Link href="/forgot-password" className="text-xs text-orange-300 hover:text-orange-200 hover:underline transition-all">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${isFormValid && !isSubmitting
                                        ? 'bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-white/20'
                                        : 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/5'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            Login
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-300">
                                    Don't have an account?{' '}
                                    <Link href="/signup" className="text-white font-semibold hover:underline transition-all decoration-white/50 hover:decoration-white">
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT SECTION - Feature Showcase - Image Changes Every 10 Seconds */}
            <div className="max-lg:hidden lg:w-[60%] h-screen sticky top-0">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative h-full w-full overflow-hidden"
                >
                    {/* Single image display with transitions */}
                    <div className="relative h-full w-full">
                        {featureShowcase.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: currentImageIndex === idx ? 1 : 0,
                                    scale: currentImageIndex === idx ? 1 : 1.05
                                }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                className="absolute inset-0"
                                style={{ pointerEvents: currentImageIndex === idx ? 'auto' : 'none' }}
                            >
                                <div className="relative h-full w-full overflow-hidden bg-black/40">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={feature.image}
                                            alt={feature.caption}
                                            fill
                                            className="object-cover opacity-90"
                                            priority={idx === 0}
                                        />
                                    </div>
                                    {/* Caption overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end">
                                        <div className="w-full p-12 mb-8">
                                            <p className="text-white font-bold text-3xl mb-4 text-shadow-lg tracking-tight">
                                                {feature.caption}
                                            </p>
                                            {/* Loading Bar */}
                                            <div className="h-1.5 w-24 bg-white/30 rounded-full overflow-hidden">
                                                {currentImageIndex === idx && (
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 4, ease: "linear" }}
                                                        className="h-full bg-white rounded-full"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Slide indicators */}
                    <div className="absolute bottom-12 right-12 flex gap-3 z-20">
                        {featureShowcase.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`transition-all duration-300 ${currentImageIndex === idx
                                    ? 'w-10 h-2 bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                                    } rounded-full backdrop-blur-sm`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}