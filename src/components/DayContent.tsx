import React from 'react';

interface DayContentProps {
    content: string;
}

export const DayContent: React.FC<DayContentProps> = ({ content }) => {
    return (
        <div className="day-content">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}; 