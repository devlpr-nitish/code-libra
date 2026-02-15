'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { signupUser } from '@/actions/auth-user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getUserProfile } from '@/actions/get-user-profile';

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
        caption: 'All Contest questions',
        image: '/contest-page.png'
    },
    {
        caption: 'Stay consistent with weekly goals',
        image: '/weekly-goals.png'
    },
];

export default function SignUpPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isValidatingUsername, setIsValidatingUsername] = useState(false);
    const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Auto-change images every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % featureShowcase.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Real username validation
    useEffect(() => {
        let active = true;

        if (username.length > 0) {
            setIsValidatingUsername(true);
            setUsernameValid(null);

            const timer = setTimeout(async () => {
                try {
                    await getUserProfile(username);
                    if (active) {
                        setUsernameValid(true);
                        setIsValidatingUsername(false);
                    }
                } catch (error) {
                    if (active) {
                        setUsernameValid(false);
                        setIsValidatingUsername(false);
                    }
                }
            }, 800);

            return () => {
                active = false;
                clearTimeout(timer);
            };
        } else {
            setUsernameValid(null);
            setIsValidatingUsername(false);
        }
    }, [username]);

    // Password strength calculation
    const getPasswordStrength = (pwd: string) => {
        if (pwd.length === 0) return 0;
        if (pwd.length < 6) return 1;
        if (pwd.length < 10) return 2;
        return 3;
    };

    const passwordStrength = getPasswordStrength(password);
    const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

    // Form validation
    const isFormValid = usernameValid && email.includes('@') && password.length >= 8;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);

        try {
            await signupUser({ username, email, password });
            toast.success('Account created successfully! Please login.');
            router.push('/login');
        } catch (error) {
            toast.error('Failed to create account. Please try again.');
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

            {/* LEFT SECTION - Sign Up Form */}
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
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-white mb-2">
                                    Join <span className="text-orange-500 dark:text-orange-400 decoration-2 decoration-orange-500/50">CodeLibra</span>
                                </h1>
                                <p className="text-gray-200 text-sm">
                                    Analyze, compare, and understand the real value of your coding profile.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Username Field */}
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                                        LeetCode Username
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Leetcode username"
                                            className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-orange-500/50 focus:bg-white/20 transition-all"
                                            required
                                        />
                                        {/* Validation icons */}
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {isValidatingUsername && (
                                                <Loader2 className="w-5 h-5 text-gray-300 animate-spin" />
                                            )}
                                            {!isValidatingUsername && usernameValid === true && (
                                                <Check className="w-5 h-5 text-green-400" />
                                            )}
                                            {!isValidatingUsername && usernameValid === false && (
                                                <X className="w-5 h-5 text-red-400" />
                                            )}
                                        </div>
                                    </div>
                                    {/* Validation message */}
                                    {username.length > 0 && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`text-xs mt-1.5 ${isValidatingUsername ? 'text-gray-300' :
                                                usernameValid ? 'text-green-300' : 'text-red-300'
                                                }`}
                                        >
                                            {isValidatingUsername ? 'Checking LeetCode username...' :
                                                usernameValid ? '✓ Valid LeetCode username' : '✗ Must match a valid LeetCode username'}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email"
                                        className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Minimum 8 characters"
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

                                    {/* Password strength indicator */}
                                    {password.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2"
                                        >
                                            <div className="flex gap-1.5 mb-1">
                                                {[0, 1, 2, 3].map((i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1 flex-1 rounded-full transition-all ${i < passwordStrength
                                                            ? 'bg-white'
                                                            : 'bg-white/20'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            {passwordStrength > 0 && (
                                                <p className="text-xs text-gray-300">
                                                    Password strength: <span className="text-white font-medium">
                                                        {strengthLabels[passwordStrength]}
                                                    </span>
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
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
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-300">
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-white font-semibold hover:underline transition-all decoration-white/50 hover:decoration-white">
                                        Login
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