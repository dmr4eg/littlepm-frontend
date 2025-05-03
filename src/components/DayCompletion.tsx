import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { daysApi } from '@/api-course/services/api-course';
import { projectsApi } from '@/api-course/services/api-course';
import type { DayDTO } from '@/api-course';
import type { ProjectDaysMapper } from '@/api-course';

interface DayCompletionProps {
    dayId: string;
}

export const DayCompletion: React.FC<DayCompletionProps> = ({ dayId }) => {
    const router = useRouter();
    const [dayData, setDayData] = useState<DayDTO | null>(null);
    const [nextDayId, setNextDayId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Fetch day data
                const data = await daysApi.dayInstancesDayBlueprintUuidUserUuidGet({
                    dayBlueprintUuid: dayId,
                    userUuid: 'current'
                });
                setDayData(data);

                // Get project blueprint UUID from the route
                const projectBlueprintUuid = router.query.projectblueprintuuid as string;
                if (!projectBlueprintUuid) return;

                // Fetch all project-day mappings
                const projectDays = await projectsApi.projectDaysMapperGet({
                    limit: 100,
                    offset: 0
                });

                // Filter and sort days for this project
                const projectDayMappers = projectDays
                    .filter(mapper => mapper.id.projectBlueprintUuid === projectBlueprintUuid)
                    .sort((a, b) => a.sortOrder - b.sortOrder);

                // Find current day index
                const currentDayIndex = projectDayMappers.findIndex(
                    mapper => mapper.id.dayBlueprintUuid === dayId
                );

                // Get next day if available
                if (currentDayIndex !== -1 && currentDayIndex < projectDayMappers.length - 1) {
                    setNextDayId(projectDayMappers[currentDayIndex + 1].id.dayBlueprintUuid);
                }
            } catch (e) {
                setError(e instanceof Error ? e : new Error('Failed to load completion data'));
            } finally {
                setIsLoading(false);
            }
        };

        if (dayId) {
            fetchData();
        }
    }, [dayId, router.query.projectblueprintuuid]);

    if (isLoading) return <div>Loading completion data...</div>;
    if (error) return <div>Error loading completion data: {error.message}</div>;
    if (!dayData) return <div>No completion data found</div>;

    const handleNextDay = () => {
        const projectBlueprintUuid = router.query.projectblueprintuuid;
        if (nextDayId) {
            router.push(`/project/${projectBlueprintUuid}/day/${nextDayId}`);
        } else {
            router.push(`/project/${projectBlueprintUuid}/complete`);
        }
    };

    return (
        <div className="day-completion">
            <h2>Day Completed!</h2>
            {dayData.instance.status === 'COMPLETED' && (
                <p>Completed on: {new Date().toLocaleDateString()}</p>
            )}

            <button
                onClick={handleNextDay}
                className="next-day-button"
            >
                {nextDayId ? 'Continue to Next Day' : 'Project Complete!'}
            </button>
        </div>
    );
}; 