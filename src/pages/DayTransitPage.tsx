// url = /project/{projectblueprintuuid}/day/next/{dayorder}\
// 1. congrats
// if next dayorder is out of bound, then redirect to ProjectComplete route 
// if no - button to redirect to next day route by its order

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Day } from '../types';

const DayTransitPage: React.FC = () => {
    const router = useRouter();
    const { projectblueprintuuid, dayorder } = router.query;

    useEffect(() => {
        const fetchNextDay = async () => {
            if (!projectblueprintuuid || !dayorder) return;

            try {
                const response = await fetch(`/api/projects/${projectblueprintuuid}/days/${dayorder}/next`);
                if (!response.ok) {
                    throw new Error('Failed to fetch next day');
                }
                const nextDay: Day = await response.json();

                if (nextDay) {
                    router.push(`/project/${projectblueprintuuid}/day/${nextDay.order}`);
                } else {
                    router.push(`/project/${projectblueprintuuid}/complete`);
                }
            } catch (error) {
                console.error('Error fetching next day:', error);
                router.push(`/project/${projectblueprintuuid}/day/${dayorder}`);
            }
        };

        fetchNextDay();
    }, [projectblueprintuuid, dayorder, router]);

    return <div>Loading next day...</div>;
};

export default DayTransitPage;

