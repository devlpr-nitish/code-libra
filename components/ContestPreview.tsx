'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Sparkles, Filter, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContestPreview() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                            <Trophy size={14} />
                            <span>Level Up Your Game</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            Master Every <span className="text-primary">Contest</span> Question
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Stop practicing randomly. Filter questions by contest, difficulty, and topic. Identify patterns in recent contests and prepare effectively for the next weekly challenge.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: Filter, title: "Smart Filtering", desc: "Filter by contest number, rating range, and tags." },
                                { icon: Zap, title: "Instant Analysis", desc: "See which topics are trending in recent contests." },
                                { icon: Sparkles, title: "Curated Lists", desc: "Practice problems that actually matter for your rating." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors border border-transparent hover:border-border/50"
                                >
                                    <div className="p-2 rounded-md bg-primary/10 text-primary mt-1">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/contest-questions"
                                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/20"
                            >
                                Explore Contest Questions
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Image Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: -5 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full relative perspective-1000"
                    >
                        <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-card/50 backdrop-blur-sm group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>

                            {/* Browser Header Mockup */}
                            <div className="h-8 bg-muted/80 w-full border-b border-border flex items-center gap-2 px-4">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="h-4 w-40 bg-background/50 rounded-full text-[10px] flex items-center justify-center text-muted-foreground">/contest-questions</div>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className="relative aspect-[16/10] w-full bg-background overflow-hidden">
                                <Image
                                    src="/contest-page.png"
                                    alt="Contest Questions Page Preview"
                                    fill
                                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-card border border-border p-4 rounded-xl shadow-xl z-30 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">
                                            U{i}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold text-foreground">100+ Users</p>
                                    <p className="text-muted-foreground text-xs">Practicing daily</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
