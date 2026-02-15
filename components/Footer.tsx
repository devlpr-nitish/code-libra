import Link from 'next/link';
import { Github, Twitter, Linkedin, Heart, Code2, WeightTilde } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <WeightTilde className="h-6 w-6 text-orange-500 dark:text-orange-400" />
                            <span><span className="text-primary">Code</span>Libra</span>
                        </div>
                        <p className="text-muted-foreground max-w-xs text-sm">
                            Level up your competitive programming skills with advanced tracking, personalized goals, and smart insights.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="https://github.com/devlpr-nitish" className="text-foreground transition-colors hover:scale-110 transform duration-200">
                                <Github size={20} />
                            </Link>
                            <Link href="https://twitter.com/devlprnitish" className="text-[#1DA1F2] transition-colors hover:scale-110 transform duration-200">
                                <Twitter size={20} />
                            </Link>
                            <Link href="https://linkedin.com/in/devlpr-nitish" className="text-[#0A66C2] transition-colors hover:scale-110 transform duration-200">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">Home</Link></li>
                            <li><Link href="/compare-profile" className="hover:text-primary transition-colors">Compare Profile</Link></li>
                            <li><Link href="/contest-questions" className="hover:text-primary transition-colors">Question Bank</Link></li>
                            <li><Link href="/weekly-goals" className="hover:text-primary transition-colors">Weekly Goals</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="https://leetcode.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LeetCode</a></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} CodeLibra. All rights reserved.</p>
                    <p className="flex items-center gap-1.5 bg-secondary/30 px-3 py-1.5 rounded-full border border-border/50">
                        Built with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> by
                        <span className="flex items-center gap-1">
                            <a href="https://x.com/devlprnitish" target="_blank" rel="noreferrer" className="font-medium text-orange-500 hover:underline">
                                Nitish
                            </a>
                        </span>
                        <span>&</span>
                        <span className="flex items-center gap-1">
                            <a href="https://x.com/Iconic0909" target="_blank" rel="noreferrer" className="font-medium text-orange-500 hover:underline">
                                Rahul
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
