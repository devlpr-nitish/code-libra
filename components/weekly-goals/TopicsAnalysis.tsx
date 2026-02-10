import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface TopicsAnalysisProps {
    weakTopics: string[];
    strongTopics: string[];
}

export default function TopicsAnalysis({ weakTopics, strongTopics }: TopicsAnalysisProps) {
    return (
        <div className="border border-border/50 p-3">
            <h3 className="text-sm font-medium mb-3">Topics Analysis</h3>

            <div className="space-y-3">
                {/* Weak Topics */}
                <div>
                    <div className="flex items-center gap-1 mb-2">
                        <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-xs text-muted-foreground">Need Practice</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {weakTopics.map((topic) => (
                            <span
                                key={topic}
                                className="px-2 py-1 text-xs rounded border border-red-500/20 bg-red-500/5 text-red-400"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Strong Topics */}
                <div>
                    <div className="flex items-center gap-1 mb-2">
                        <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-xs text-muted-foreground">Strong Areas</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {strongTopics.map((topic) => (
                            <span
                                key={topic}
                                className="px-2 py-1 text-xs rounded border border-green-500/20 bg-green-500/5 text-green-400"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
