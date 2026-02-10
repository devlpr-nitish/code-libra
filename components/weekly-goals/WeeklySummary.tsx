import React from 'react';
import { Flame, Trophy, Target } from 'lucide-react';

interface WeeklySummaryProps {
    weeklyStats: {
        problemsSolved: number;
        scoreGained: number;
        currentStreak: number;
        completionRate: number;
        totalTimeMinutes: number;
    };
}

export default function WeeklySummary({ weeklyStats }: WeeklySummaryProps) {
    return (
        <div className="border border-border/50 p-3">
            <h3 className="text-sm font-medium mb-3">This Week</h3>

            <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                    <div className="text-lg font-bold">{weeklyStats.problemsSolved}</div>
                    <div className="text-[10px] text-muted-foreground">Solved</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold text-green-500">+{weeklyStats.scoreGained}</div>
                    <div className="text-[10px] text-muted-foreground">Score</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold">{Math.round(weeklyStats.totalTimeMinutes / 60)}h</div>
                    <div className="text-[10px] text-muted-foreground">Time</div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-xs text-muted-foreground">Streak</span>
                </div>
                <span className="text-sm font-bold">{weeklyStats.currentStreak} days</span>
            </div>

            <div className="flex items-center justify-between pt-2 mt-2 border-t border-border/50">
                <div className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs text-muted-foreground">Completion</span>
                </div>
                <span className="text-sm font-bold">{weeklyStats.completionRate}%</span>
            </div>
        </div>
    );
}
