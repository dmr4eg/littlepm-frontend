// url = /project/{projectblueprintuuid}/day/{dayorder}
// TODO render day from openapi calls and create component objects
// const DayPage = (useruuid, projectuuid, dayuuid) -> Component
// 2. button next redirects to daytransit route

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Day } from '../types';
import { DayContent } from '../components/DayContent';
import { DayChecklist } from '../components/DayChecklist';
import { DayCompletion } from '../components/DayCompletion';

const DayPage: React.FC = () => {
    const { projectblueprintuuid, dayorder } = useParams<{ projectblueprintuuid: string; dayorder: string }>();
    const [day, setDay] = useState<Day | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDay = async () => {
            try {
                const response = await fetch(`/api/projects/${projectblueprintuuid}/days/${dayorder}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch day data');
                }
                const data = await response.json();
                setDay(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchDay();
    }, [projectblueprintuuid, dayorder]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!day) return <div>Day not found</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">{day.title}</h1>
            <p className="text-lg">{day.description}</p>

            {day.content.map((item: Day['content'][0], index: number) => {
                switch (item.type) {
                    case 'text':
                        return <DayContent key={index} content={item.data} />;
                    case 'checklist':
                        return <DayChecklist key={index} items={item.data} />;
                    case 'completion':
                        return <DayCompletion key={index} onComplete={() => { }} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default DayPage;