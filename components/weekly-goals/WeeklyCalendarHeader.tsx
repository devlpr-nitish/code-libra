import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WeeklyCalendarHeaderProps {
    currentView: 'day' | 'week';
    onViewChange: (view: 'day' | 'week') => void;
    weekRange: string;
    onWeekChange: (direction: 'prev' | 'next') => void;
}

export default function WeeklyCalendarHeader({
    currentView,
    onViewChange,
    weekRange,
    onWeekChange
}: WeeklyCalendarHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            {/* View Toggle Tabs */}
            <div className="relative flex gap-1 dark:bg-muted/30 bg-muted-foreground/10 p-1 rounded overflow-hidden">
                {/* Sliding Background Indicator */}
                <div
                    className={`absolute left-1 inset-y-1 w-[calc(50%-0.375rem)] bg-background shadow-sm rounded-sm transition-transform duration-300 ease-out ${currentView === 'week' ? 'translate-x-[calc(100%+0.25rem)]' : 'translate-x-0'
                        }`}
                />
                <button
                    onClick={() => onViewChange('day')}
                    className={`relative z-10 px-4 py-1.5 rounded-sm text-sm font-medium transition-colors ${currentView === 'day'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground cursor-pointer'
                        }`}
                >
                    Day
                </button>
                <button
                    onClick={() => onViewChange('week')}
                    className={`relative z-10 px-4 py-1.5 rounded-sm text-sm font-medium transition-colors ${currentView === 'week'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground cursor-pointer'
                        }`}
                >
                    Week
                </button>
            </div>

            {/* Week Navigation */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onWeekChange('prev')}
                    className="p-1 dark:bg-muted/50 bg-muted-foreground/10 rounded transition-colors cursor-pointer"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium min-w-[140px] text-center">
                    {weekRange}
                </span>
                <button
                    onClick={() => onWeekChange('next')}
                    className="p-1 dark:bg-muted/50 bg-muted-foreground/10 rounded transition-colors cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="w-[120px]" />
        </div>
    );
}
