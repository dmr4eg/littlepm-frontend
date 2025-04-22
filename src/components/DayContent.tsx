import React from 'react';

interface DayContentProps {
    content: string;
}

const DayContent: React.FC<DayContentProps> = ({ content }) => {
    return (
        <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export { DayContent }; 