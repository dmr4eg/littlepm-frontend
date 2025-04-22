import React, { useState } from 'react';

interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
}

interface DayChecklistProps {
    items: ChecklistItem[];
}

const DayChecklist: React.FC<DayChecklistProps> = ({ items }) => {
    const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(items);

    const toggleItem = (itemId: string) => {
        setChecklistItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
            )
        );
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Checklist</h2>
            <ul className="space-y-2">
                {checklistItems.map(item => (
                    <li key={item.id} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleItem(item.id)}
                            className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className={item.completed ? 'line-through text-gray-500' : ''}>
                            {item.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { DayChecklist }; 