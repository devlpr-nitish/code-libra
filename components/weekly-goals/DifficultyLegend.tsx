import React from 'react';

export default function DifficultyLegend() {
    return (
        <div className="border border-border/50 p-2">
            <div className="flex gap-2 justify-between">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border border-green-500/20 bg-green-800"></div>
                    <span className="text-[10px] text-foreground">Easy</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border border-yellow-500/20 bg-yellow-800"></div>
                    <span className="text-[10px] text-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border border-red-500/20 bg-red-800"></div>
                    <span className="text-[10px] text-foreground">Hard</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded border border-pink-500/20 bg-pink-800"></div>
                    <span className="text-[10px] text-foreground">Revision</span>
                </div>
            </div>
        </div>
    );
}
