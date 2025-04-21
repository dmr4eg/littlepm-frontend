import React from 'react';
import { Link } from 'react-router-dom';

interface CompletionData {
    completedAt: string;
    nextDayId?: string;
}

interface DayCompletionProps {
    dayId: string;
    completionData: CompletionData;
}

export const DayCompletion: React.FC<DayCompletionProps> = ({
    dayId,
    completionData
}) => {
    return (
        <div className="day-completion">
            <h2>Day Completed!</h2>
            <p>Completed on: {new Date(completionData.completedAt).toLocaleDateString()}</p>

            {completionData.nextDayId ? (
                <Link
                    to={`/day/${completionData.nextDayId}`}
                    className="next-day-button"
                >
                    Continue to Next Day
                </Link>
            ) : (
                <Link
                    to="/project-complete"
                    className="project-complete-button"
                >
                    Project Complete!
                </Link>
            )}
        </div>
    );
}; 