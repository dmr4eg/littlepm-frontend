// url = /project/{projectblueprintuuid}/day/{dayorder}
// TODO render day from openapi calls and create component objects
// const DayPage = (useruuid, projectuuid, dayuuid) -> Component
// 2. button next redirects to daytransit route

import React from 'react';
import { useRouter } from 'next/router';
import DayDTO from '../api/models/DayDTO';
import DayBlueprint from '../api/models/DayBlueprint';
import DayInstance from '../api/models/DayInstance';
import { useDay } from '../hooks/useDay';
import { DayContent } from '../components/DayContent';
import { DayChecklist } from '../components/DayChecklist';
import { DayCompletion } from '../components/DayCompletion';

const DayPage = () => {
    const router = useRouter();
    const { dayId } = router.query;

    const { data: day, isLoading, error } = useDay(dayId as string);


    // TODO add content states for fields, tasks, media, forms ans text
    //  TODO useEffect for callback all content of the day

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
            {/* TODO if there is component in state -> render them using ui components*/}
            <DayContent content={blueprint.text} />

            {instance.status === 'IN_PROGRESS' && (
                <DayChecklist
                    dayId={dayId as string}
                    tasks={blueprint.tasks || []}
                />
            )}

            {instance.status === 'COMPLETED' && (
                <DayCompletion
                    dayId={dayId as string}
                    completionData={instance.completionData}
                />
            )}
        </div>
    );
};

export default DayPage;