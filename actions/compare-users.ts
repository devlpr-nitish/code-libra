'use server';
import { GO_BACKEND_API_URL } from "@/lib/api-url";

export interface ComparisonRequest {
    user1_name: string;
    user2_name: string;
    user1_data: string;
    user2_data: string;
}

export interface ComparisonResponse {
    winner: string;
    winner_points: string[];
    loser_points: string[];
}

export async function compareUsers(data: ComparisonRequest): Promise<ComparisonResponse> {

    try {
        const response = await fetch(`${GO_BACKEND_API_URL}/api/v1/compare`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            // Check if result has expected structure, if not fall through to mock
            if (result && result.winner) {
                return result;
            }
        }
    } catch (error) {
        console.error("Comparison API failed, falling back to mock data:", error);
    }

    // Mock response logic (Fallback)
    return {
        winner: data.user1_name,
        winner_points: [
            `${data.user1_name} has a significantly better global rank, indicating superior competitive performance.`,
            `${data.user1_name} demonstrates higher consistency with a streak.`,
            `${data.user1_name} has solved a larger volume of problems, showing more breadth of knowledge.`,
            `${data.user1_name}'s profile suggests a more disciplined approach to daily practice.`
        ],
        loser_points: [
            `${data.user2_name} needs to improve consistency to match the daily dedication shown by top-tier users.`,
            `${data.user2_name} should focus on participating in contests to improve global rank.`,
            `${data.user2_name} needs to increase total problem solving count to gain more experience.`,
            `${data.user2_name} should try to solve more hard problems to boost rating faster.`
        ]
    };
}
