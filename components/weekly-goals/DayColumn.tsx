'use client';

import { motion } from 'framer-motion';

export interface DailyTask {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topic: string;
    scoreGain: number;
    isRevision?: boolean;
    completed?: boolean;
    problemLink?: string;
    estimatedMinutes?: number;
}

export interface Contest {
    name: string;
    date: string;
    daysUntil: number;
    potentialScoreGain?: number;
}

interface DayColumnProps {
    day: string;
    date: string;
    tasks: DailyTask[];
    isWeekend?: boolean;
    isToday?: boolean;
    onTaskToggle?: (taskId: string) => void;
    contest?: Contest;
    index?: number; // For staggered animation
}

export default function DayColumn({ day, date, tasks, isWeekend, isToday, onTaskToggle, contest, index = 0 }: DayColumnProps) {
    const difficultyColors = {
        Easy: 'text-green-500 border-green-500/20 bg-green-500/5',
        Medium: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5',
        Hard: 'text-red-500 border-red-500/20 bg-red-500/5',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut"
            }}
            className={`flex flex-col h-full border-r border-border/50 last:border-r-0 ${isToday ? 'bg-muted/20' : ''}`}
        >
            {/* Day Header */}
            <div className={`p-3 border-b border-border/50 ${isToday ? 'bg-primary/5' : ''}`}>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">{day}</div>
                <div className={`text-sm font-medium mt-0.5 ${isToday ? 'text-primary' : ''}`}>{date}</div>
            </div>

            {/* Tasks */}
            <div className="flex-1 p-2 space-y-2">
                {/* Contest Card - Show first if available */}
                {contest && (
                    <div className={`p-2.5 rounded border ${contest.name.includes('Biweekly')
                        ? 'border-purple-500/30 bg-purple-500/10'
                        : 'border-orange-500/30 bg-orange-500/10'
                        }`}>
                        <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-xs">🏆</span>
                            <div className={`text-xs font-medium ${contest.name.includes('Biweekly') ? 'text-purple-400' : 'text-orange-400'
                                }`}>
                                {contest.name.includes('Biweekly') ? 'Biweekly Contest' : 'Weekly Contest'}
                            </div>
                        </div>
                        <div className="text-[11px] text-foreground font-medium mb-1">{contest.name}</div>
                        <div className="flex items-center justify-between text-[10px]">
                            <span className="text-muted-foreground">{contest.daysUntil === 0 ? 'Today' : `${contest.daysUntil} days`}</span>
                            {contest.potentialScoreGain && (
                                <span className="text-green-500 font-medium">+{contest.potentialScoreGain} pts</span>
                            )}
                        </div>
                    </div>
                )}

                {isWeekend && tasks.length > 0 && tasks[0].isRevision ? (
                    <div className="p-3 rounded border border-pink-500/20 bg-pink-500/5">
                        <div className="text-xs font-medium text-pink-400 mb-1">📚 Weekly Revision</div>
                        <div className="text-sm text-foreground">{tasks[0].topic}</div>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`group relative p-2.5 rounded border transition-all hover:shadow-sm ${task.completed ? 'opacity-50' : ''
                                } ${difficultyColors[task.difficulty]}`}
                        >
                            <div className="flex items-start gap-2">
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={task.completed || false}
                                    onChange={() => onTaskToggle?.(task.id)}
                                    className="mt-0.5 w-3.5 h-3.5 rounded cursor-pointer"
                                />
                                <div className="flex-1 min-w-0">
                                    {task.problemLink ? (
                                        <a
                                            href={task.problemLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-xs font-medium hover:underline block truncate mb-1 ${task.completed ? 'line-through' : ''}`}
                                        >
                                            {task.title}
                                        </a>
                                    ) : (
                                        <div className={`text-xs font-medium truncate mb-1 ${task.completed ? 'line-through' : ''}`}>
                                            {task.title}
                                        </div>
                                    )}
                                    <div className="text-[10px] text-muted-foreground truncate">{task.topic}</div>
                                    <div className="flex items-center justify-between mt-2 gap-2">
                                        {task.estimatedMinutes && (
                                            <span className="text-[10px] text-muted-foreground">{task.estimatedMinutes}m</span>
                                        )}
                                        <span className="text-[10px] text-muted-foreground">+{task.scoreGain} pts</span>
                                    </div>
                                </div>
                            </div>
                            {/* Tooltip - shows on card hover */}
                            <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-border">
                                <div className="font-medium">{task.title}</div>
                                <div className="text-muted-foreground mt-0.5">{task.topic}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
}