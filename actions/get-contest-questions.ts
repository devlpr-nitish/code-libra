'use server';

import { CONTEST_API_URL } from "@/lib/api-url";

export interface ContestQuestion {
    id: number;
    title: string;
    contestSlug: string;
    contestName: string;
    problemIndex: string;
    rating: number;
}

interface RawQuestion {
    ID: number;
    Title: string;
    ContestSlug: string;
    ContestID_en: string;
    ProblemIndex: string;
    Rating: number;
}

export async function getContestQuestions(): Promise<ContestQuestion[]> {
    try {
        const response = await fetch(`${CONTEST_API_URL}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch contest questions: ${response.statusText}`);
        }

        const data: RawQuestion[] = await response.json();

        // Transform the data to our format
        const questions: ContestQuestion[] = data.map((q) => ({
            id: q.ID,
            title: q.Title,
            contestSlug: q.ContestSlug,
            contestName: q.ContestID_en,
            problemIndex: q.ProblemIndex,
            rating: q.Rating
        }));

        return questions;
    } catch (error) {
        console.error('Error fetching contest questions:', error);
        throw new Error('Failed to fetch contest questions. Please try again later.');
    }
}
