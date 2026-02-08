import { Suspense } from 'react';
import { getContestQuestions } from '@/actions/get-contest-questions';
import ContestQuestionsTable from '@/components/ContestQuestionsTable';
import { Skeleton } from '@/components/ui/skeleton';

function TableSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-48" />
            <div className="space-y-2">
                {[...Array(10)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
        </div>
    );
}

async function ContestQuestionsContent() {
    const questions = await getContestQuestions();

    return (
        <div className="space-y-6">
            <div>
                {/* <h1 className="text-3xl font-bold tracking-tight">Contest Questions</h1> */}
                <p className="mt-2 font-bold">
                    Browse LeetCode contest questions with difficulty ratings
                </p>
            </div>
            <ContestQuestionsTable questions={questions} />
        </div>
    );
}

export default function ContestQuestionsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <Suspense fallback={<TableSkeleton />}>
                    <ContestQuestionsContent />
                </Suspense>
            </div>
        </div>
    );
}
