'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import WeeklyCalendarHeader from '@/components/weekly-goals/WeeklyCalendarHeader';
import DayColumn, { DailyTask, Contest } from '@/components/weekly-goals/DayColumn';
import ProfileScoreTracker from '@/components/weekly-goals/ProfileScoreTracker';
import TopicsAnalysis from '@/components/weekly-goals/TopicsAnalysis';
import WeeklySummary from '@/components/weekly-goals/WeeklySummary';
import DifficultyLegend from '@/components/weekly-goals/DifficultyLegend';

// Mock data - will be replaced with actual user data
const initialWeeklyPlan: Record<string, DailyTask[]> = {
    'Sunday': [
        {
            id: '1',
            title: 'Revise: Arrays, Hash Tables, Binary Search',
            difficulty: 'Medium',
            topic: 'Weekly Revision',
            scoreGain: 0,
            isRevision: true,
        },
    ],
    'Monday': [
        {
            id: '2',
            title: 'Two Sum',
            difficulty: 'Easy',
            topic: 'Arrays',
            scoreGain: 5,
            problemLink: 'https://leetcode.com/problems/two-sum/',
            estimatedMinutes: 15,
        },
        {
            id: '3',
            title: 'Longest Substring Without Repeating',
            difficulty: 'Medium',
            topic: 'Sliding Window',
            scoreGain: 12,
            problemLink: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
            estimatedMinutes: 25,
        },
    ],
    'Tuesday': [
        {
            id: '4',
            title: 'Binary Search',
            difficulty: 'Easy',
            topic: 'Binary Search',
            scoreGain: 5,
            problemLink: 'https://leetcode.com/problems/binary-search/',
            estimatedMinutes: 15,
        },
        {
            id: '5',
            title: 'Search in Rotated Sorted Array',
            difficulty: 'Medium',
            topic: 'Binary Search',
            scoreGain: 12,
            problemLink: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
            estimatedMinutes: 30,
        },
    ],
    'Wednesday': [
        {
            id: '6',
            title: 'Valid Parentheses',
            difficulty: 'Easy',
            topic: 'Stack',
            scoreGain: 5,
            problemLink: 'https://leetcode.com/problems/valid-parentheses/',
            estimatedMinutes: 15,
        },
        {
            id: '7',
            title: 'Daily Temperatures',
            difficulty: 'Medium',
            topic: 'Stack',
            scoreGain: 12,
            problemLink: 'https://leetcode.com/problems/daily-temperatures/',
            estimatedMinutes: 25,
        },
        {
            id: '8',
            title: 'Trapping Rain Water',
            difficulty: 'Hard',
            topic: 'Stack',
            scoreGain: 25,
            problemLink: 'https://leetcode.com/problems/trapping-rain-water/',
            estimatedMinutes: 45,
        },
    ],
    'Thursday': [
        {
            id: '9',
            title: 'Merge Two Sorted Lists',
            difficulty: 'Easy',
            topic: 'Linked List',
            scoreGain: 5,
            problemLink: 'https://leetcode.com/problems/merge-two-sorted-lists/',
            estimatedMinutes: 15,
        },
        {
            id: '10',
            title: 'Reorder List',
            difficulty: 'Medium',
            topic: 'Linked List',
            scoreGain: 12,
            problemLink: 'https://leetcode.com/problems/reorder-list/',
            estimatedMinutes: 30,
        },
    ],
    'Friday': [
        {
            id: '11',
            title: 'Coin Change',
            difficulty: 'Medium',
            topic: 'Dynamic Programming',
            scoreGain: 12,
            problemLink: 'https://leetcode.com/problems/coin-change/',
            estimatedMinutes: 30,
        },
        {
            id: '12',
            title: 'Longest Increasing Subsequence',
            difficulty: 'Medium',
            topic: 'Dynamic Programming',
            scoreGain: 12,
            problemLink: 'https://leetcode.com/problems/longest-increasing-subsequence/',
            estimatedMinutes: 35,
        },
    ],
    'Saturday': [
        {
            id: '13',
            title: 'Revise: DP Problems from this week',
            difficulty: 'Medium',
            topic: 'Weekend Revision',
            scoreGain: 0,
            isRevision: true,
        },
    ],
};

// Contest data - Biweekly contests on alternate Saturdays, Weekly contests every Sunday
const weekendContests: Record<string, Contest> = {
    'Saturday': {
        name: 'Biweekly Contest 142',
        date: 'Feb 14, 2026',
        daysUntil: 4,
        potentialScoreGain: 90,
    },
    'Sunday': {
        name: 'Weekly Contest 435',
        date: 'Feb 15, 2026',
        daysUntil: 5,
        potentialScoreGain: 85,
    },
};

const WeeklyGoalsPage = () => {
    const [currentView, setCurrentView] = useState<'day' | 'week'>('week');
    const [weekOffset, setWeekOffset] = useState(0);
    const [weeklyPlan, setWeeklyPlan] = useState<Record<string, DailyTask[]>>(initialWeeklyPlan);

    // Handle task completion toggle
    const handleTaskToggle = (taskId: string) => {
        setWeeklyPlan(prev => {
            const newPlan = { ...prev };
            Object.keys(newPlan).forEach(day => {
                newPlan[day] = newPlan[day].map(task =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                );
            });
            return newPlan;
        });
    };

    // Calculate current week range
    const weekRange = useMemo(() => {
        const today = new Date();
        const currentDay = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDay + (weekOffset * 7));

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const formatDate = (date: Date) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${date.getDate()} ${months[date.getMonth()]}`;
        };

        return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
    }, [weekOffset]);

    const handleWeekChange = (direction: 'prev' | 'next') => {
        setWeekOffset(prev => direction === 'prev' ? prev - 1 : prev + 1);
    };

    // Calculate which day is today
    const todayDayName = useMemo(() => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    }, []);

    // Calculate total score for today
    const todayScore = useMemo(() => {
        const tasks = weeklyPlan[todayDayName] || [];
        return tasks.reduce((sum, task) => sum + task.scoreGain, 0);
    }, [todayDayName, weeklyPlan]);

    // Calculate weekly stats
    const weeklyStats = useMemo(() => {
        let problemsSolved = 0;
        let scoreGained = 0;
        let totalTasks = 0;
        let completedTasks = 0;
        let totalTimeMinutes = 0;

        Object.values(weeklyPlan).forEach(dayTasks => {
            dayTasks.forEach(task => {
                if (!task.isRevision) {
                    totalTasks++;
                    if (task.completed) {
                        problemsSolved++;
                        scoreGained += task.scoreGain;
                        completedTasks++;
                        totalTimeMinutes += task.estimatedMinutes || 0;
                    }
                }
            });
        });

        return {
            problemsSolved,
            scoreGained,
            currentStreak: 12, // Mock value
            completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
            totalTimeMinutes,
        };
    }, [weeklyPlan]);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dates = useMemo(() => {
        const today = new Date();
        const currentDay = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDay + (weekOffset * 7));

        return days.map((_, index) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + index);
            return date.getDate().toString();
        });
    }, [weekOffset]);

    return (
        <div className="min-h-screen bg-background text-foreground px-6">
            <div className="max-w-7xl mx-auto px-4 py-2">
                {/* Page Header */}
                <div className="mb-4">
                    {/* <h1 className="text-2xl font-bold text-foreground">Weekly Goals</h1> */}
                    <p className="text-md font-medium text-foreground mt-1">
                        Personalized learning plan based on your profile
                    </p>
                </div>

                {/* Calendar Header with Tabs */}
                <WeeklyCalendarHeader
                    currentView={currentView}
                    onViewChange={setCurrentView}
                    weekRange={weekRange}
                    onWeekChange={handleWeekChange}
                />

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
                    {/* Left Sidebar - Stats */}
                    <div className="space-y-3">
                        <DifficultyLegend />
                        <WeeklySummary weeklyStats={weeklyStats} />


                        <ProfileScoreTracker
                            currentScore={450}
                            potentialScoreToday={todayScore}
                            scoreGainedYesterday={17}
                            completedYesterday={true}
                        />

                        <TopicsAnalysis
                            weakTopics={['Dynamic Programming', 'Graphs', 'Tree Traversal']}
                            strongTopics={['Arrays', 'Hash Tables', 'Binary Search']}
                        />
                    </div>

                    {/* Right Panel - Calendar */}
                    <div className="border border-border/50 overflow-hidden">
                        {currentView === 'week' ? (
                            <div key={weekOffset} className="grid grid-cols-7 h-[calc(100vh-280px)] min-h-[500px]">
                                {days.map((day, index) => (
                                    <DayColumn
                                        key={day}
                                        day={day.substring(0, 3).toUpperCase()}
                                        date={dates[index]}
                                        tasks={weeklyPlan[day] || []}
                                        isWeekend={index === 0 || index === 6}
                                        isToday={weekOffset === 0 && day === todayDayName}
                                        onTaskToggle={handleTaskToggle}
                                        contest={weekendContests[day]}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            // Day view - show only today
                            <div className="grid grid-cols-1 h-[calc(100vh-280px)] min-h-[500px]">
                                <DayColumn
                                    day={todayDayName.substring(0, 3).toUpperCase()}
                                    date={new Date().getDate().toString()}
                                    tasks={weeklyPlan[todayDayName] || []}
                                    isWeekend={todayDayName === 'Saturday' || todayDayName === 'Sunday'}
                                    isToday={true}
                                    onTaskToggle={handleTaskToggle}
                                    contest={weekendContests[todayDayName]}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default WeeklyGoalsPage;