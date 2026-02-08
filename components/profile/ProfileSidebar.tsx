'use client';

import { DetailedUserProfile } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, GitCompare, Share2, Github, Twitter, Linkedin, Globe, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import Image from 'next/image';

interface ProfileSidebarProps {
    user: DetailedUserProfile;
}

const getCountryCode = (countryName: string) => {
    if (!countryName) return "un";
    const map: Record<string, string> = {
        "India": "in", "United States": "us", "China": "cn", "Taiwan": "tw",
        "Japan": "jp", "South Korea": "kr", "Canada": "ca", "Vietnam": "vn",
        "Russia": "ru", "Ukraine": "ua", "Germany": "de", "France": "fr",
        "United Kingdom": "gb", "Brazil": "br", "Singapore": "sg", "Australia": "au",
        "Turkey": "tr", "Poland": "pl", "Netherlands": "nl", "Italy": "it",
        "Egypt": "eg", "Bangladesh": "bd", "Romania": "ro", "Israel": "il",
        "Indonesia": "id", "Mexico": "mx", "Spain": "es", "Sweden": "se",
        "Switzerland": "ch", "Belgium": "be", "Argentina": "ar", "Colombia": "co",
        "Greece": "gr", "Portugal": "pt", "Norway": "no", "Denmark": "dk",
        "Finland": "fi", "Austria": "at", "Hong Kong": "hk", "Ireland": "ie",
        "New Zealand": "nz", "Malaysia": "my", "Philippines": "ph", "Thailand": "th",
        "Saudi Arabia": "sa", "Pakistan": "pk", "Iran": "ir", "South Africa": "za",
        "Nigeria": "ng", "Kenya": "ke", "Chile": "cl", "Peru": "pe", "Venezuela": "ve",
        "Czechia": "cz", "Hungary": "hu", "Slovakia": "sk", "Bulgaria": "bg",
        "Serbia": "rs", "Croatia": "hr", "Estonia": "ee", "Latvia": "lv", "Lithuania": "lt"
    };
    return map[countryName] || "un";
};

export default function ProfileSidebar({ user }: ProfileSidebarProps) {
    const getIconUrl = (iconPath: string) => iconPath.startsWith('http') ? iconPath : `https://leetcode.com${iconPath}`;
    const activeBadge = user.badgesData?.activeBadge;

    return (
        <div className="sticky top-4 space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-row items-start gap-4 p-2 border-1 border-border/30">
                <div className="relative">
                    <Avatar className="h-24 w-24 rounded-md shadow-xl ring-2 ring-primary/20">
                        <AvatarImage src={user.avatar} alt={user.username} className="rounded-md" />
                        <AvatarFallback className="text-3xl rounded-md">{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>

                {/* Name & Username */}
                <div className="flex flex-col pt-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
                        {/* Active Badge */}
                        {activeBadge?.icon && (
                            <div className="relative w-5 h-5 md:w-6 md:h-6" title={activeBadge.displayName}>
                                <Image
                                    src={getIconUrl(activeBadge.icon)}
                                    alt={activeBadge.displayName}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground">@{user.username}</p>

                    {(user.gitHub || user.twitter || user.linkedIN || (user.website && user.website.length > 0)) && (
                        <>
                            <div className="flex justify-start gap-3 mt-2">
                                <div className="flex items-center gap-3 text-sm">
                                    {user.country && (
                                        <div className="flex items-center gap-1.5">
                                            <span className={`fi fi-${getCountryCode(user.country)} text-base`} title={user.country} />
                                        </div>
                                    )}
                                </div>
                                {user.gitHub && (
                                    <a href={user.gitHub} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {user.twitter && (
                                    <a href={user.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#1DA1F2] transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                                {user.linkedIN && (
                                    <a href={user.linkedIN} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-[#0A66C2] transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {user.website && user.website.length > 0 && (
                                    <a href={user.website[0]} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                                        <Globe className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>


            <div className="flex items-center justify-between gap-4 p-2 border-1 border-border/30">
                {/* Circular Progress */}
                <div className="relative w-[120px] h-[120px] flex-shrink-0">
                    <svg width="120" height="120" className="transform -rotate-90">
                        <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke="hsl(var(--secondary))"
                            strokeWidth="8"
                        />
                        {/* Hard Segment (Bottom Layer) */}
                        <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke="#ef4444" // red-500
                            strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 52}
                            strokeDashoffset={0}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                            style={{ opacity: user.solvedStats.hard > 0 ? 1 : 0 }}
                        />
                        {/* Medium Segment (Middle Layer) */}
                        <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke="#eab308" // yellow-500
                            strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 52}
                            strokeDashoffset={2 * Math.PI * 52 * (1 - ((user.solvedStats.easy + user.solvedStats.medium) / (user.solvedStats.easy + user.solvedStats.medium + user.solvedStats.hard + 0.0001)))}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                            style={{ opacity: user.solvedStats.medium > 0 ? 1 : 0 }}
                        />
                        {/* Easy Segment (Top Layer) */}
                        <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke="#10b981" // emerald-500
                            strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 52}
                            strokeDashoffset={2 * Math.PI * 52 * (1 - (user.solvedStats.easy / (user.solvedStats.easy + user.solvedStats.medium + user.solvedStats.hard + 0.0001)))}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-foreground leading-none">
                            {user.totalSolved}
                        </div>
                        <div className="text-[10px] text-muted-foreground uppercase mt-1">Solved</div>
                    </div>
                </div>

                {/* Legend Stats */}
                <div className="flex flex-col gap-2 w-full min-w-0">
                    {/* Easy */}
                    <div className="flex items-center justify-between bg-secondary/20 rounded px-2 py-1.5">
                        <div className="text-xs text-emerald-500 font-medium">Easy</div>
                        <div className="text-xs font-medium">
                            <span className="text-foreground">{user.solvedStats.easy}</span>
                            <span className="text-muted-foreground">/{user.solvedStats.totalEasy}</span>
                        </div>
                    </div>
                    {/* Medium */}
                    <div className="flex items-center justify-between bg-secondary/20 rounded px-2 py-1.5">
                        <div className="text-xs text-yellow-500 font-medium">Med.</div>
                        <div className="text-xs font-medium">
                            <span className="text-foreground">{user.solvedStats.medium}</span>
                            <span className="text-muted-foreground">/{user.solvedStats.totalMedium}</span>
                        </div>
                    </div>
                    {/* Hard */}
                    <div className="flex items-center justify-between bg-secondary/20 rounded px-2 py-1.5">
                        <div className="text-xs text-red-500 font-medium">Hard</div>
                        <div className="text-xs font-medium">
                            <span className="text-foreground">{user.solvedStats.hard}</span>
                            <span className="text-muted-foreground">/{user.solvedStats.totalHard}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <Button variant="outline" className="w-full cursor-pointer" size="sm">
                    <GitCompare className="w-4 h-4 mr-2" />
                    Compare
                </Button>
                <Button variant="outline" className="w-full cursor-pointer" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </Button>
            </div>

            <div className="flex justify-center -mt-2">
                <div className="text-xs text-muted-foreground font-medium">
                    {/* Placeholder for Attempting if data existed, for now omitted or static if requested */}
                </div>
            </div>
        </div>
    );
}
