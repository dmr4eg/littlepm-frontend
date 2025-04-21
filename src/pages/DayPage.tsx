// url = /project/{projectblueprintuuid}/day/{dayorder}
// TODO render day from openapi calls and create component objects
// const DayPage = (useruuid, projectuuid, dayuuid) -> Component
// 2. button next redirects to daytransit route

import React from 'react';
import { useParams } from 'react-router-dom';
import { DayDTO } from '../api/models/DayDTO';
import { DayBlueprint } from '../api/models/DayBlueprint';
import { DayInstance } from '../api/models/DayInstance';
import { useDay } from '../hooks/useDay';
import { DayContent } from '../components/DayContent';
import { DayChecklist } from '../components/DayChecklist';
import { DayCompletion } from '../components/DayCompletion';

interface DayPageProps {
    dayId: string;
}

export const DayPage: React.FC<DayPageProps> = ({ dayId }) => {
    const { data: day, isLoading, error } = useDay(dayId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading day: {error.message}</div>;
    }

    if (!day) {
        return <div>Day not found</div>;
    }

    const { blueprint, instance } = day;

    return (
        <div className="day-page">
            <h1>{blueprint.title}</h1>
            {blueprint.description && <p>{blueprint.description}</p>}

            <DayContent content={blueprint.text} />

            {instance.status === 'IN_PROGRESS' && (
                <DayChecklist
                    dayId={dayId}
                    tasks={blueprint.tasks || []}
                />
            )}

            {instance.status === 'COMPLETED' && (
                <DayCompletion
                    dayId={dayId}
                    completionData={instance.completionData}
                />
            )}
        </div>
    );
};