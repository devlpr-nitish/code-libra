'use client';

import { DetailedUserProfile } from '@/lib/mock-data';
import Image from 'next/image';
import { Badge as BadgeType } from '@/actions/get-user-badges';
import { Award } from 'lucide-react';

interface BadgesSectionProps {
    user: DetailedUserProfile;
}

function BadgeItem({ badge }: { badge: BadgeType }) {
    const iconUrl = badge.icon.startsWith('http') ? badge.icon : `https://leetcode.com${badge.icon}`;

    return (
        <div className="group relative flex flex-col items-center">
            <div className="w-12 h-12 relative transition-transform transform group-hover:scale-110">
                <Image
                    src={iconUrl}
                    alt={badge.displayName}
                    fill
                    className="object-contain"
                />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-border">
                <div className="font-medium">{badge.displayName}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{badge.creationDate}</div>
            </div>
        </div>
    );
}

export default function BadgesSection({ user }: BadgesSectionProps) {
    const badges = user.badgesData?.badges || [];
    const badgesCount = user.badgesData?.badgesCount || 0;
    const sortedBadges = [...badges].sort((a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );

    // Get most recent badge
    const recentBadge = sortedBadges[0];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Badges & Achievements
                </h3>
                <div className="text-2xl font-bold text-primary tabular-nums">{badgesCount}</div>
            </div>

            {recentBadge && (
                <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-16 relative">
                            <Image
                                src={recentBadge.icon.startsWith('http') ? recentBadge.icon : `https://leetcode.com${recentBadge.icon}`}
                                alt={recentBadge.displayName}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">Most Recent</div>
                            <div className="text-lg font-bold text-foreground">{recentBadge.displayName}</div>
                            <div className="text-xs text-muted-foreground">{recentBadge.creationDate}</div>
                        </div>
                    </div>
                </div>
            )}

            {badges.length > 0 ? (
                <div className="relative">
                    <div className="overflow-x-auto pb-2 scrollbar-thin">
                        <div className="flex gap-4 min-w-min px-1">
                            {sortedBadges.map((badge) => (
                                <BadgeItem key={badge.id} badge={badge} />
                            ))}
                        </div>
                    </div>

                    {/* Fade overlay on right */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                </div>
            ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                    No badges earned yet
                </div>
            )}
        </div>
    );
}
