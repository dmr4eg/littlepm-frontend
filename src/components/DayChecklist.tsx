import React, { useState, useEffect } from 'react';
import { daysApi } from '@/api-course/services/api-course';
import { tasksApi } from '@/api-content/services/api-content';
import type { DayComponentsMapper } from '@/api-course';
import type { TaskDTO } from '@/api-content';

interface DayChecklistProps {
    dayId: string;
}

export const DayChecklist: React.FC<DayChecklistProps> = ({ dayId }) => {
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setIsLoading(true);
                const allComponents = await daysApi.dayComponentsMapperGet({
                    limit: 100,
                    offset: 0,
                });
                const taskComponents = allComponents.filter(
                    comp => comp.id.dayBlueprintUuid === dayId && comp.type === 'TASK'
                );
                const taskPromises = taskComponents.map(async (component) => {
                    const taskData = await tasksApi.taskInstancesTaskBlueprintUuidUserUuidGet({
                        taskBlueprintUuid: component.id.componentUuid,
                        userUuid: 'current'
                    });
                    return taskData;
                });

                const taskData = await Promise.all(taskPromises);
                setTasks(taskData);
            } catch (e) {
                setError(e instanceof Error ? e : new Error('Failed to load tasks'));
            } finally {
                setIsLoading(false);
            }
        };

        if (dayId) {
            fetchTasks();
        }
    }, [dayId]);

    const handleTaskToggle = async (taskId: string) => {
        const updatedTasks = tasks.map(task =>
            task.blueprint.taskBlueprintUuid === taskId
                ? {
                    ...task,
                    progress: {
                        ...task.progress,
                        status: !task.progress.status
                    }
                }
                : task
        );
        setTasks(updatedTasks);

        try {
            setIsSubmitting(true);
            const taskToUpdate = updatedTasks.find(t => t.blueprint.taskBlueprintUuid === taskId);
            if (taskToUpdate) {
                await tasksApi.taskInstancesTaskBlueprintUuidUserUuidPut({
                    taskBlueprintUuid: taskId,
                    userUuid: 'current',
                    taskInstance: taskToUpdate.progress
                });
            }
        } catch (error) {
            console.error('Failed to update task:', error);
            // Revert the change if the update fails
            setTasks(tasks);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div>Loading tasks...</div>;
    if (error) return <div>Error loading tasks: {error.message}</div>;

    const allTasksCompleted = tasks.every(task => task.progress.status);

    return (
        <div className="day-checklist">
            <h2>Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.blueprint.taskBlueprintUuid}>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.progress.status}
                                onChange={() => handleTaskToggle(task.blueprint.taskBlueprintUuid)}
                                disabled={isSubmitting}
                            />
                            {task.blueprint.title}
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