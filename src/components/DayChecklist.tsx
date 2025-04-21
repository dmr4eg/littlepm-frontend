import React, { useState } from 'react';
import { ApiClient } from '../api/ApiClient';

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
            const apiClient = new ApiClient();
            await apiClient.days.updateDayTasks(dayId, updatedTasks);
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