import React from 'react';

interface DayCompletionProps {
    onComplete: () => void;
}

const DayCompletion: React.FC<DayCompletionProps> = ({ onComplete }) => {
    return (
        <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">Day Completed!</h2>
            <p className="text-lg">Great job! You've completed all the tasks for this day.</p>
            <button
                onClick={onComplete}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
                Continue to Next Day
            </button>
        </div>
    );
};

export { DayCompletion }; 