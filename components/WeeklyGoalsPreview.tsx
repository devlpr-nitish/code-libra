'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Calendar, Zap, Lock } from 'lucide-react';
import Image from 'next/image';

export default function WeeklyGoalsPreview() {
    return (
        <section className="py-24 relative overflow-hidden bg-secondary/5">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-1/3 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-medium">
                            <Lock size={14} />
                            <span>Coming Soon</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            Personalized <span className="text-primary">Weekly Growth</span> Plan
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Stop guessing what to solve next. We analyze your performance to create a custom roadmap targeting your weak topics. Stay consistent with daily curated tasks.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: Target, title: "Personalized Roadmap", desc: "Tailored problem sets based on your profile and weaknesses." },
                                { icon: TrendingUp, title: "Topic Analysis", desc: "Identify and master weak topics like DP or Graphs." },
                                { icon: Calendar, title: "Daily Tasks", desc: "Curated problems to solve every day to keep your streak alive." },
                                { icon: Zap, title: "Gamified Progress", desc: "Track your growth with scores and unlock achievements." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors border border-transparent hover:border-border/50"
                                >
                                    <div className="p-2 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 mt-1">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotateY: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full relative perspective-1000"
                    >
                        <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-card/50 backdrop-blur-sm group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>

                            {/* Browser Header Mockup */}
                            <div className="h-8 bg-muted/80 w-full border-b border-border flex items-center gap-2 px-4">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="h-4 w-40 bg-background/50 rounded-full text-[10px] flex items-center justify-center text-muted-foreground">/weekly-goals</div>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className="relative aspect-[16/10] w-full bg-background overflow-hidden">
                                <Image
                                    src="/weekly-goals.png"
                                    alt="Weekly Goals Page Preview"
                                    fill
                                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                                />
                            </div>

                            {/* Overlay for "Work in Progress" feel */}
                            <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-background/80 backdrop-blur-md border border-border px-6 py-3 rounded-full font-bold text-foreground shadow-lg">
                                    🚧 Work in Progress
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
