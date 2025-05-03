// url = /project/{projectblueprintuuid}/day/next/{dayorder}
// 1. congrats
// if next dayorder is out of bound, then redirect to ProjectComplete route 
// if no - button to redirect to next day route by its order

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { projectsApi } from '@/api-course/services/api-course';
import type { ProjectDaysMapper } from '@/api-course';
import { useAuth } from '@/contexts/AuthContext';
import keycloak from '@/configs/keycloak';

interface DayTransition {
    currentDayOrder: number;
    nextDayOrder?: number;
    totalDays: number;
    projectId: string;
}

const DayTransitPage: React.FC = () => {
    const router = useRouter();
    const { projectblueprintuuid, dayorder } = router.query;
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [transition, setTransition] = useState<DayTransition | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const userUuid = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (!projectblueprintuuid || !dayorder || !userUuid || authLoading || !isAuthenticated) return;

        const fetchTransitionInfo = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await projectsApi.projectDaysMapperGet({
                    limit: 100,
                    offset: 0,
                });

                const projectMappers = response
                    .filter(mapper => mapper.id.projectBlueprintUuid === projectblueprintuuid)
                    .sort((a, b) => a.sortOrder - b.sortOrder);

                const currentDayIndex = projectMappers.findIndex(
                    mapper => mapper.sortOrder === parseInt(dayorder as string)
                );
                const nextDayIndex = currentDayIndex + 1;

                setTransition({
                    currentDayOrder: parseInt(dayorder as string),
                    nextDayOrder: nextDayIndex < projectMappers.length ? projectMappers[nextDayIndex].sortOrder : undefined,
                    totalDays: projectMappers.length,
                    projectId: projectblueprintuuid as string
                });

                if (nextDayIndex >= projectMappers.length) {
                    router.push(`/project/${projectblueprintuuid}/complete`);
                }
            } catch (e) {
                setError(e instanceof Error ? e : new Error('Failed to fetch transition info'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransitionInfo();
    }, [projectblueprintuuid, dayorder, userUuid, authLoading, isAuthenticated, router]);

    if (authLoading || isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!transition) return <div>Transition info not found</div>;

    const handleNextDay = () => {
        if (transition.nextDayOrder) {
            router.push(`/project/${projectblueprintuuid}/day/${transition.nextDayOrder}`);
        }
    };

    return (
        <div className="day-transit-page p-6">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-3xl font-bold mb-6">Great job!</h1>
                <div className="transition-message space-y-4 mb-8">
                    <h2 className="text-2xl font-semibold">
                        You've completed Day {transition.currentDayOrder}
                    </h2>
                    <p className="text-lg text-gray-600">
                        You're making great progress!
                    </p>
                    {transition.nextDayOrder && (
                        <p className="text-lg text-gray-600">
                            Ready for Day {transition.nextDayOrder}?
                        </p>
                    )}
                </div>
                {transition.nextDayOrder ? (
                    <button
                        onClick={handleNextDay}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Continue to Next Day
                    </button>
                ) : (
                    <button
                        onClick={() => router.push(`/project/${projectblueprintuuid}/complete`)}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Complete Project
                    </button>
                )}
            </div>
        </div>
    );
};

export default DayTransitPage;

