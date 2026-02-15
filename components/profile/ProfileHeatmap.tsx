'use client';

import { DetailedUserProfile } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from 'react';
import { ChevronDown, Palette } from 'lucide-react';

interface ProfileHeatmapProps {
    user: DetailedUserProfile;
}

export type ColorTheme = 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'pink';

export const HEATMAP_THEMES: { name: ColorTheme; label: string; previewColors: string[]; hex: string }[] = [
    {
        name: 'green',
        label: 'Green',
        previewColors: ['bg-green-300 dark:bg-green-900/40', 'bg-green-400 dark:bg-green-800/60', 'bg-green-500 dark:bg-green-600/80', 'bg-green-600 dark:bg-green-500'],
        hex: '#10b981' // emerald-500
    },
    {
        name: 'blue',
        label: 'Blue',
        previewColors: ['bg-blue-300 dark:bg-blue-900/40', 'bg-blue-400 dark:bg-blue-800/60', 'bg-blue-500 dark:bg-blue-600/80', 'bg-blue-600 dark:bg-blue-500'],
        hex: '#3b82f6' // blue-500
    },
    {
        name: 'purple',
        label: 'Purple',
        previewColors: ['bg-purple-300 dark:bg-purple-900/40', 'bg-purple-400 dark:bg-purple-800/60', 'bg-purple-500 dark:bg-purple-600/80', 'bg-purple-600 dark:bg-purple-500'],
        hex: '#a855f7' // purple-500
    },
    {
        name: 'orange',
        label: 'Orange',
        previewColors: ['bg-orange-300 dark:bg-orange-900/40', 'bg-orange-400 dark:bg-orange-800/60', 'bg-orange-500 dark:bg-orange-600/80', 'bg-orange-600 dark:bg-orange-500'],
        hex: '#f97316' // orange-500
    },
    {
        name: 'red',
        label: 'Red',
        previewColors: ['bg-red-300 dark:bg-red-900/40', 'bg-red-400 dark:bg-red-800/60', 'bg-red-500 dark:bg-red-600/80', 'bg-red-600 dark:bg-red-500'],
        hex: '#ef4444' // red-500
    },
    {
        name: 'pink',
        label: 'Pink',
        previewColors: ['bg-pink-300 dark:bg-pink-900/40', 'bg-pink-400 dark:bg-pink-800/60', 'bg-pink-500 dark:bg-pink-600/80', 'bg-pink-600 dark:bg-pink-500'],
        hex: '#ec4899' // pink-500
    },
];

interface ProfileHeatmapProps {
    user: DetailedUserProfile;
    theme?: ColorTheme;
    onThemeChange?: (theme: ColorTheme) => void;
}

export default function ProfileHeatmap({ user, theme, onThemeChange }: ProfileHeatmapProps) {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [localTheme, setLocalTheme] = useState<ColorTheme>('green');
    const [showColorPicker, setShowColorPicker] = useState(false);

    const activeTheme = theme || localTheme;

    const handleThemeChange = (newTheme: ColorTheme) => {
        if (onThemeChange) {
            onThemeChange(newTheme);
        } else {
            setLocalTheme(newTheme);
        }
        setShowColorPicker(false);
    };

    // Get available years from user data
    const availableYears = useMemo(() => {
        const years = user.activeYears || [currentYear];
        return years.sort((a, b) => b - a);
    }, [user.activeYears, currentYear]);

    // Generate heatmap data for the selected year
    const yearlyActivity = useMemo(() => {
        const calendar = user.submissionCalendar || {};
        const startDate = new Date(selectedYear, 0, 1);
        const endDate = new Date(selectedYear, 11, 31);
        const days = [];

        // Add padding for start day of week
        const startDay = startDate.getDay();
        for (let i = 0; i < startDay; i++) {
            days.push({ date: '', count: 0, intensity: -1 });
        }

        // Create lookup map for submissions
        const statsMap = new Map<string, number>();
        Object.entries(calendar).forEach(([ts, count]) => {
            const date = new Date(parseInt(ts) * 1000);
            const dateIso = date.toISOString().split('T')[0];
            statsMap.set(dateIso, count);
        });

        const currDate = new Date(startDate);

        while (currDate <= endDate) {
            const dateStr = currDate.toISOString().split('T')[0];
            const count = statsMap.get(dateStr) || 0;

            let intensity = 0;
            if (count > 0) intensity = 1;
            if (count > 2) intensity = 2;
            if (count > 5) intensity = 3;
            if (count > 10) intensity = 4;

            days.push({ date: dateStr, count, intensity });
            currDate.setDate(currDate.getDate() + 1);
        }
        return days;
    }, [user, selectedYear]);

    const totalSubmissions = useMemo(() => {
        return yearlyActivity.reduce((acc, curr) => acc + (curr.count || 0), 0);
    }, [yearlyActivity]);

    const getColorClass = (intensity: number, theme: ColorTheme) => {
        if (intensity === -1) return "invisible"; // Padding
        if (intensity === 0) return "bg-neutral-200 dark:bg-secondary/30"; // Empty

        if (theme === 'green') {
            switch (intensity) {
                case 1: return "bg-green-300 dark:bg-green-900/40";
                case 2: return "bg-green-400 dark:bg-green-800/60";
                case 3: return "bg-green-500 dark:bg-green-600/80";
                case 4: return "bg-green-600 dark:bg-green-500";
            }
        } else if (theme === 'blue') {
            switch (intensity) {
                case 1: return "bg-blue-300 dark:bg-blue-900/40";
                case 2: return "bg-blue-400 dark:bg-blue-800/60";
                case 3: return "bg-blue-500 dark:bg-blue-600/80";
                case 4: return "bg-blue-600 dark:bg-blue-500";
            }
        } else if (theme === 'purple') {
            switch (intensity) {
                case 1: return "bg-purple-300 dark:bg-purple-900/40";
                case 2: return "bg-purple-400 dark:bg-purple-800/60";
                case 3: return "bg-purple-500 dark:bg-purple-600/80";
                case 4: return "bg-purple-600 dark:bg-purple-500";
            }
        } else if (theme === 'orange') {
            switch (intensity) {
                case 1: return "bg-orange-300 dark:bg-orange-900/40";
                case 2: return "bg-orange-400 dark:bg-orange-800/60";
                case 3: return "bg-orange-500 dark:bg-orange-600/80";
                case 4: return "bg-orange-600 dark:bg-orange-500";
            }
        } else if (theme === 'red') {
            switch (intensity) {
                case 1: return "bg-red-300 dark:bg-red-900/40";
                case 2: return "bg-red-400 dark:bg-red-800/60";
                case 3: return "bg-red-500 dark:bg-red-600/80";
                case 4: return "bg-red-600 dark:bg-red-500";
            }
        } else if (theme === 'pink') {
            switch (intensity) {
                case 1: return "bg-pink-300 dark:bg-pink-900/40";
                case 2: return "bg-pink-400 dark:bg-pink-800/60";
                case 3: return "bg-pink-500 dark:bg-pink-600/80";
                case 4: return "bg-pink-600 dark:bg-pink-500";
            }
        }
        return "bg-neutral-200 dark:bg-secondary/30";
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-foreground">
                    Submission Activity
                </h3>

                <div className="flex items-center gap-2">
                    {/* Color Theme Selector */}
                    <div className="flex items-center gap-2">
                        {/* Color Swatches - Toggle on left */}
                        {showColorPicker && (
                            <div className="flex items-cente gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
                                {HEATMAP_THEMES.map((theme) => (
                                    <button
                                        key={theme.name}
                                        onClick={() => handleThemeChange(theme.name)}
                                        className={cn(
                                            "flex flex-col gap-0.5 rounded-md cursor-pointer transition-all hover:scale-105"
                                        )}
                                        title={theme.label}
                                    >
                                        {theme.previewColors.map((color, idx) => (
                                            <div
                                                key={idx}
                                                className={cn("w-4 h-1 rounded-[1px]", color)}
                                            />
                                        ))}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Palette Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 cursor-pointer"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                        >
                            <Palette className="h-3.5 w-3.5" />
                        </Button>
                    </div>

                    {/* Year Selector */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1 cursor-pointer">
                                {selectedYear}
                                <ChevronDown className="h-3 w-3 opacity-50 cursor-pointer" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {availableYears.map(year => (
                                <DropdownMenuItem key={year} onClick={() => setSelectedYear(year)} className="cursor-pointer">
                                    {year}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs px-1">
                    <span className="font-medium text-primary">{user.username}</span>
                    <span className="text-muted-foreground">
                        {totalSubmissions} submissions in {selectedYear}
                    </span>
                </div>

                <div className="grid grid-rows-7 grid-flow-col gap-[2px] w-fit max-w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {yearlyActivity.map((day, i) => (
                        <TooltipProvider key={i}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <div
                                        className={cn(
                                            "w-4 h-4 rounded-[1px] transition-colors",
                                            getColorClass(day.intensity, activeTheme)
                                        )}
                                    />
                                </TooltipTrigger>
                                {day.intensity !== -1 && (
                                    <TooltipContent className="text-xs">
                                        <p className="font-medium">
                                            {day.count} submission{day.count !== 1 ? 's' : ''} on {day.date}
                                        </p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                <div>
                    <span className="font-semibold text-foreground">{user.activeDays}</span> <span className={`text-${activeTheme}-500`}>total active days</span>
                </div>
                <div>
                    <span className="font-semibold text-foreground">{user.totalSolved.toLocaleString()}</span> <span className={`text-${activeTheme}-500`}>total solved</span>
                </div>
                <div>
                    <span className="font-semibold text-foreground">{user.streak}</span> <span className={`text-${activeTheme}-500`}>max streak in {new Date().getFullYear()}</span>
                </div>
            </div>
        </div>
    );
}
