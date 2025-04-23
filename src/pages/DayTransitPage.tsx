// url = /project/{projectblueprintuuid}/day/next/{dayorder}\
// 1. congrats
// if next dayorder is out of bound, then redirect to ProjectComplete route 
// if no - button to redirect to next day route by its order

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DefaultApi from '../api/controllers/DefaultApi';
import ProjectDaysMapper from '../api/models/ProjectDaysMapper';

interface DayTransition {
    currentDayOrder: number;
    nextDayOrder?: number;
    totalDays: number;
    projectId: string;
}

const DayTransitPage = () => {
    const router = useRouter();
    const { projectId, dayOrder } = router.query;
    const [transition, setTransition] = useState<DayTransition | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTransitionInfo = async () => {
            if (!projectId || !dayOrder) return;

            try {
                const api = new DefaultApi();
                const response = await new Promise<ProjectDaysMapper[]>((resolve, reject) => {
                    api.projectDaysMapperGet(100, 0, (error: Error | null, data: ProjectDaysMapper[]) => {
                        if (error) reject(error);
                        else resolve(data);
                    });
                });

                // Filter mappers for this project and sort by sort order
                const projectMappers = response
                    .filter(mapper => mapper.id.project_blueprint_uuid === projectId)
                    .sort((a, b) => a.sortOrder - b.sortOrder);

                const currentDayIndex = projectMappers.findIndex(mapper => mapper.sortOrder === parseInt(dayOrder as string));
                const nextDayIndex = currentDayIndex + 1;

                setTransition({
                    currentDayOrder: parseInt(dayOrder as string),
                    nextDayOrder: nextDayIndex < projectMappers.length ? projectMappers[nextDayIndex].sortOrder : undefined,
                    totalDays: projectMappers.length,
                    projectId: projectId as string
                });

                // If there's no next day, redirect to project completion
                if (nextDayIndex >= projectMappers.length) {
                    router.push(`/project/${projectId}/complete`);
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch transition info'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransitionInfo();
    }, [projectId, dayOrder, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!transition) {
        return <div>Transition info not found</div>;
    }

    const handleNextDay = () => {
        if (transition.nextDayOrder) {
            router.push(`/project/${projectId}/day/${transition.nextDayOrder}`);
        }
    };

    return (
        <div className="day-transit-page">
            <h1>Great job!</h1>
            <div className="transition-message">
                <h2>You've completed Day {transition.currentDayOrder}</h2>
                <p>You're making great progress!</p>
                {transition.nextDayOrder && (
                    <p>Ready for Day {transition.nextDayOrder}?</p>
                )}
            </div>
            {transition.nextDayOrder ? (
                <button
                    onClick={handleNextDay}
                    className="next-day-button"
                >
                    Continue to Next Day
                </button>
            ) : (
                <button
                    onClick={() => router.push(`/project/${projectId}/complete`)}
                    className="complete-project-button"
                >
                    Complete Project
                </button>
            )}
        </div>
    );
};

export default DayTransitPage;

