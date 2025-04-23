import React, { useState } from 'react';
import api from '../api/api';
import DayInstance from '../api/models/DayInstance';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface DayChecklistProps {
    dayId: string;
    tasks: Task[];
}

export const DayChecklist: React.FC<DayChecklistProps> = ({ dayId, tasks }) => {
    const [taskList, setTaskList] = useState<Task[]>(tasks);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTaskToggle = async (taskId: string) => {
        const updatedTasks = taskList.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTaskList(updatedTasks);

        try {
            setIsSubmitting(true);
            await new Promise<DayInstance>((resolve, reject) => {
                api.dayInstancesDayBlueprintUuidUserUuidPut(dayId, 'current', updatedTasks, (error: Error | null, data: DayInstance) => {
                    if (error) reject(error);
                    else resolve(data);
                });
            });
        } catch (error) {
            console.error('Failed to update tasks:', error);
            // Revert the change if the update fails
            setTaskList(tasks);
        } finally {
            setIsSubmitting(false);
        }
    };

    const allTasksCompleted = taskList.every(task => task.completed);

    return (
        <div className="day-checklist">
            <h2>Tasks</h2>
            <ul>
                {taskList.map(task => (
                    <li key={task.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleTaskToggle(task.id)}
                                disabled={isSubmitting}
                            />
                            {task.title}
                        </label>
                    </li>
                ))}
            </ul>
            {allTasksCompleted && (
                <button
                    className="complete-day-button"
                    disabled={isSubmitting}
                >
                    Complete Day
                </button>
            )}
        </div>
    );
}; 