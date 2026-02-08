'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface Activity {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeAgo: string;
    type: 'accepted' | 'solution' | 'list' | 'discussion';
}

// Static mock data
const mockActivities: Activity[] = [
    { id: '1', title: 'Two Sum', difficulty: 'Easy', timeAgo: '2 hours ago', type: 'accepted' },
    { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', timeAgo: '5 hours ago', type: 'accepted' },
    { id: '3', title: 'Longest Substring Without Repeating', difficulty: 'Medium', timeAgo: '1 day ago', type: 'accepted' },
    { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', timeAgo: '2 days ago', type: 'accepted' },
    { id: '5', title: 'Longest Palindromic Substring', difficulty: 'Medium', timeAgo: '3 days ago', type: 'accepted' },
];

const mockSolutions: Activity[] = [
    { id: '1', title: 'Optimal O(n) solution for Two Sum', difficulty: 'Easy', timeAgo: '1 week ago', type: 'solution' },
    { id: '2', title: 'Dynamic Programming approach', difficulty: 'Hard', timeAgo: '2 weeks ago', type: 'solution' },
];

const mockLists: Activity[] = [
    { id: '1', title: 'Top Interview Questions', difficulty: 'Medium', timeAgo: '1 month ago', type: 'list' },
    { id: '2', title: 'Dynamic Programming Practice', difficulty: 'Hard', timeAgo: '2 months ago', type: 'list' },
];

const mockDiscussions: Activity[] = [
    { id: '1', title: 'Better approach for graph problems?', difficulty: 'Hard', timeAgo: '3 days ago', type: 'discussion' },
    { id: '2', title: 'Time complexity clarification', difficulty: 'Medium', timeAgo: '1 week ago', type: 'discussion' },
];

function ActivityItem({ activity }: { activity: Activity }) {
    const difficultyColor = {
        'Easy': 'bg-green-500/10 text-green-500 border-green-500/20',
        'Medium': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        'Hard': 'bg-red-500/10 text-red-500 border-red-500/20',
    };

    return (
        <div className="flex items-center justify-between py-3 px-2 hover:bg-secondary/50 rounded-lg transition-colors group">
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {activity.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`text-xs ${difficultyColor[activity.difficulty]}`}>
                        {activity.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.timeAgo}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function ActivityFeed() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Recent Activity</h3>

            <Tabs defaultValue="accepted" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="accepted" className="text-xs">Accepted</TabsTrigger>
                    <TabsTrigger value="solutions" className="text-xs">Solutions</TabsTrigger>
                    <TabsTrigger value="lists" className="text-xs">Lists</TabsTrigger>
                    <TabsTrigger value="discussions" className="text-xs">Discussions</TabsTrigger>
                </TabsList>

                <TabsContent value="accepted" className="mt-4">
                    <div className="space-y-1 max-h-[400px] overflow-y-auto">
                        {mockActivities.map(activity => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="solutions" className="mt-4">
                    <div className="space-y-1 max-h-[400px] overflow-y-auto">
                        {mockSolutions.map(activity => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="lists" className="mt-4">
                    <div className="space-y-1 max-h-[400px] overflow-y-auto">
                        {mockLists.map(activity => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="discussions" className="mt-4">
                    <div className="space-y-1 max-h-[400px] overflow-y-auto">
                        {mockDiscussions.map(activity => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
