'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SummaryCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    iconColor?: string;
    badge?: ReactNode;
    miniChart?: ReactNode;
    className?: string;
}

export default function SummaryCard({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor = 'text-primary',
    badge,
    miniChart,
    className
}: SummaryCardProps) {
    return (
        <div className={cn(
            "relative p-2 transition-all",
            "shadow-sm",
            className
        )}>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <div className={cn("p-2 rounded-lg bg-background/50", iconColor)}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        {title}
                    </span>
                    <div className="text-md font-bold text-foreground tabular-nums">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </div>
                </div>
                {badge && <div>{badge}</div>}
            </div>
        </div>
    );
}