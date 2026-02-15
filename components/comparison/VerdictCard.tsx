'use client';

import { useState, useEffect } from 'react';
import { compareUsers, ComparisonResponse } from '@/actions/compare-users';
import { DetailedUserProfile } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Sparkles, Share2, Download, Copy, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// @ts-ignore
import { toast } from 'sonner';

interface VerdictCardProps {
    userA: DetailedUserProfile;
    userB: DetailedUserProfile;
}

export default function VerdictCard({ userA, userB }: VerdictCardProps) {
    const [comparisonResult, setComparisonResult] = useState<ComparisonResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComparison = async () => {
            setLoading(true);
            try {
                // Construct textual data description for AI
                const user1Data = `
                    Username: ${userA.username}
                    Contest Rating: ${userA.contestRating}
                    Global Rank: ${userA.ranking}
                    Total Solved: ${userA.totalSolved} (Easy: ${userA.solvedStats.easy}, Medium: ${userA.solvedStats.medium}, Hard: ${userA.solvedStats.hard})
                    Streak: ${userA.streak} days
                    Badges: ${userA.badgesData?.badgesCount || 0}
                 `;
                const user2Data = `
                    Username: ${userB.username}
                    Contest Rating: ${userB.contestRating}
                    Global Rank: ${userB.ranking}
                    Total Solved: ${userB.totalSolved} (Easy: ${userB.solvedStats.easy}, Medium: ${userB.solvedStats.medium}, Hard: ${userB.solvedStats.hard})
                    Streak: ${userB.streak} days
                    Badges: ${userB.badgesData?.badgesCount || 0}
                 `;

                const result = await compareUsers({
                    user1_name: userA.username,
                    user2_name: userB.username,
                    user1_data: user1Data.trim(),
                    user2_data: user2Data.trim()
                });
                setComparisonResult(result);
            } catch (error) {
                console.error("Failed to fetch comparison:", error);
                toast.error("Failed to load detailed verdict.");
            } finally {
                setLoading(false);
            }
        };

        if (userA && userB) {
            fetchComparison();
        }
    }, [userA, userB]);

    const localWinner = userA.contestRating >= userB.contestRating ? userA : userB;
    const isA = localWinner.username === userA.username;

    const winnerName = comparisonResult ? comparisonResult.winner : localWinner.username;

    const loserName = comparisonResult
        ? (comparisonResult.winner === userA.username ? userB.username : userA.username)
        : (localWinner.username === userA.username ? userB.username : userA.username);


    const handleShare = async (platform: 'twitter' | 'linkedin' | 'copy') => {
        const currentUrl = window.location.href;
        const text = `Check out this LeetCode comparison: ${userA.username} vs ${userB.username}! 🚀 #LeetCode #Coding`;

        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
        } else if (platform === 'copy') {
            await navigator.clipboard.writeText(currentUrl);
            toast.success("Link copied to clipboard!");
        }
    };



    return (
        <div id="verdict-card-capture-area" className="w-full relative z-20 p-4 bg-background/50 rounded-xl">
            <div className="relative z-10 bg-transparent py-8 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Winner Analysis */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                Detailed Verdict
                            </h2>
                            <span className={`px-3 py-1 text-xs rounded-full uppercase tracking-wider font-mono font-bold ${isA ? 'bg-cyan-500/10 text-cyan-500' : 'bg-red-500/10 text-red-500'}`}>
                                Winner: {winnerName}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Winning Factors */}
                            <div className="space-y-3 bg-secondary/5 rounded-xl p-4 border border-border/50">
                                <h3 className="text-sm font-medium text-foreground uppercase tracking-wide flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-yellow-500" />
                                    Winning Factors
                                </h3>
                                <ul className="space-y-2">
                                    {comparisonResult ? (
                                        comparisonResult.winner_points.map((point, i) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                {point}
                                            </li>
                                        ))
                                    ) : (
                                        Array.from({ length: 4 }).map((_, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="h-4 w-4 rounded-full bg-secondary animate-pulse" />
                                                <div className="h-4 bg-secondary rounded w-full animate-pulse" />
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>

                            {/* Strategies for Growth (Loser) */}
                            <div className="space-y-3 bg-secondary/5 rounded-xl p-4 border border-border/50">
                                <h3 className="text-sm font-medium text-foreground uppercase tracking-wide flex items-center gap-2">
                                    <span className="text-muted-foreground">Strategies for {loserName}</span>
                                </h3>
                                <ul className="space-y-2">
                                    {comparisonResult ? (
                                        comparisonResult.loser_points.map((point, i) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <span className="text-blue-500 mt-1">↗</span>
                                                {point}
                                            </li>
                                        ))
                                    ) : (
                                        Array.from({ length: 4 }).map((_, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="h-4 w-4 rounded-full bg-secondary animate-pulse" />
                                                <div className="h-4 bg-secondary rounded w-full animate-pulse" />
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions & Summary */}
                    <div className="flex flex-col justify-between space-y-6 md:border-l md:border-border/50 md:pl-8">
                        <div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                <span className={`font-medium ${isA ? 'text-cyan-500' : 'text-red-500'}`}>{winnerName}</span> leads with a stronger profile.
                                <span className="block mt-2">
                                    {comparisonResult
                                        ? "AI Analysis completed based on recent performance metrics."
                                        : "Generating AI-powered analysis of strengths and weaknesses..."}
                                </span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full border-border cursor-pointer hover:bg-secondary text-foreground text-xs justify-start h-10">
                                        <Share2 className="w-4 h-4 mr-2" /> Share Comparison
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem onClick={() => handleShare('copy')} className="gap-2 cursor-pointer">
                                        <Copy className="w-4 h-4" /> Copy Link
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleShare('twitter')} className="gap-2 cursor-pointer">
                                        <Twitter className="w-4 h-4 text-[#1DA1F2]" /> Share on X
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleShare('linkedin')} className="gap-2 cursor-pointer">
                                        <Linkedin className="w-4 h-4 text-[#0A66C2]" /> Share on LinkedIn
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
