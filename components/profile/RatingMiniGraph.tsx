'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface RatingMiniGraphProps {
    data: { date: string; rating: number }[];
}

export default function RatingMiniGraph({ data }: RatingMiniGraphProps) {
    // Take last 10 contests
    const recentData = data.slice(-10);

    if (recentData.length === 0) {
        return <div className="h-12 flex items-center justify-center text-xs text-muted-foreground">No data</div>;
    }

    return (
        <div className="h-12 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recentData}>
                    <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
