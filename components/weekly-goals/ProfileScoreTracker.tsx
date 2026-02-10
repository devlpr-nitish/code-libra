import React from 'react';
import { TrendingUp, Target, Info } from 'lucide-react';

interface ProfileScoreTrackerProps {
    currentScore: number;
    potentialScoreToday: number;
    scoreGainedYesterday?: number;
    completedYesterday?: boolean;
}

// Rank tier system matching ProfileSidebar
const getRankTier = (score: number) => {
    if (score >= 801) return { name: 'Execute', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', barColor: 'bg-yellow-500', maxScore: 1000 };
    if (score >= 601) return { name: 'Compile', color: 'text-orange-500', bgColor: 'bg-orange-500/10', barColor: 'bg-orange-500', maxScore: 800 };
    if (score >= 401) return { name: 'Optimize', color: 'text-purple-500', bgColor: 'bg-purple-500/10', barColor: 'bg-purple-500', maxScore: 600 };
    if (score >= 201) return { name: 'Loop', color: 'text-blue-500', bgColor: 'bg-blue-500/10', barColor: 'bg-blue-500', maxScore: 400 };
    return { name: 'Init', color: 'text-gray-500', bgColor: 'bg-gray-500/10', barColor: 'bg-gray-500', maxScore: 200 };
};

const getNextTierInfo = (score: number) => {
    if (score >= 801) return null; // Already at max tier
    if (score >= 601) return { nextTier: 'Execute', pointsNeeded: 801 - score, total: 200, color: 'text-yellow-500' };
    if (score >= 401) return { nextTier: 'Compile', pointsNeeded: 601 - score, total: 200, color: 'text-orange-500' };
    if (score >= 201) return { nextTier: 'Optimize', pointsNeeded: 401 - score, total: 200, color: 'text-purple-500' };
    return { nextTier: 'Loop', pointsNeeded: 201 - score, total: 200, color: 'text-blue-500' };
};

export default function ProfileScoreTracker({
    currentScore,
    potentialScoreToday,
    scoreGainedYesterday,
    completedYesterday
}: ProfileScoreTrackerProps) {
    const currentTier = getRankTier(currentScore);
    const nextTierInfo = getNextTierInfo(currentScore);

    // Calculate progress percentage based on 200-point intervals
    let progressPercentage = 0;
    if (currentScore >= 801) progressPercentage = 100;
    else if (currentScore >= 601) progressPercentage = ((currentScore - 600) / 200) * 100;
    else if (currentScore >= 401) progressPercentage = ((currentScore - 400) / 200) * 100;
    else if (currentScore >= 201) progressPercentage = ((currentScore - 200) / 200) * 100;
    else progressPercentage = (currentScore / 200) * 100;

    progressPercentage = Math.min(Math.max(progressPercentage, 0), 100);

    return (
        <div className="border border-border/50 p-3 space-y-3">
            <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">Profile Score</h3>
                <span className="relative group cursor-help">
                    <Info className="w-3 h-3 text-muted-foreground" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-border w-64">
                        <div className="font-semibold mb-1">Score Components (0-1000)</div>
                        <div className="space-y-0.5 text-left font-normal normal-case">
                            <div>• Problem Solving: 400pts</div>
                            <div>• Topic Coverage: 200pts</div>
                            <div>• Contest Performance: 200pts</div>
                            <div>• Consistency: 100pts</div>
                            <div>• Advanced Topics: 100pts</div>
                        </div>
                        <div className="mt-1.5 pt-1.5 border-t border-border/50">
                            <div className="font-semibold mb-0.5">Rank Tiers</div>
                            <div className="grid grid-cols-2 gap-x-2 text-[9px]">
                                <div className={currentScore <= 200 ? 'text-gray-500 font-semibold' : ''}>0-200: Init</div>
                                <div className={currentScore > 200 && currentScore <= 400 ? 'text-blue-500 font-semibold' : ''}>201-400: Loop</div>
                                <div className={currentScore > 400 && currentScore <= 600 ? 'text-purple-500 font-semibold' : ''}>401-600: Optimize</div>
                                <div className={currentScore > 600 && currentScore <= 800 ? 'text-orange-500 font-semibold' : ''}>601-800: Compile</div>
                                <div className={currentScore > 800 ? 'text-yellow-500 font-semibold' : ''}>801-1000: Execute</div>
                            </div>
                        </div>
                    </div>
                </span>
            </div>

            {/* Current Score with Tier */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className={`text-3xl font-bold ${currentTier.color}`}>
                        {currentScore}
                    </div>
                </div>
                <div className={`px-3 py-1.5 font-semibold text-sm ${currentTier.bgColor} ${currentTier.color}`}>
                    {currentTier.name}
                </div>
            </div>

            {/* Progress to Next Tier */}
            {nextTierInfo && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                            Next Tier: <span className={`font-semibold ${nextTierInfo.color}`}>{nextTierInfo.nextTier}</span>
                        </span>
                        <span className="font-medium">{nextTierInfo.pointsNeeded} pts needed</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
                        <div
                            className={`h-full ${currentTier.barColor} transition-all duration-500`}
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Potential Score After Today */}
            <div className="pt-3 border-t border-border/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        After Today
                    </div>
                    <div className="text-lg font-bold">
                        {currentScore + potentialScoreToday}
                        <span className="text-xs text-green-500 ml-1">+{potentialScoreToday}</span>
                    </div>
                </div>
            </div>

            {/* Yesterday's Progress */}
            {scoreGainedYesterday !== undefined && (
                <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Yesterday</span>
                        {completedYesterday ? (
                            <span className="text-green-500 font-medium">+{scoreGainedYesterday} pts ✓</span>
                        ) : (
                            <span className="text-red-500/70 font-medium">Missed</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
