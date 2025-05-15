import { useState, useEffect } from 'react';
import { daysApi } from '../api/api-course/services/api-course';
import { tasksApi, formsApi, mediaApi } from '../api/api-content/services/api-content';
import type { DayDTO, DayComponentsMapper } from '../api/api-course';
import type { TaskDTO, FormDTO, Media } from '../api/api-content';

interface UseDayResult {
    day: DayDTO | null;
    components: DayComponentsMapper[];
    tasks: TaskDTO[];
    forms: FormDTO[];
    media: Media[];
    text: string | undefined;
    isLoading: boolean;
    error: Error | null;
}

export function useDay(dayBlueprintUuid: string | undefined, userUuid: string | undefined): UseDayResult {
    const [day, setDay] = useState<DayDTO | null>(null);
    const [components, setComponents] = useState<DayComponentsMapper[]>([]);
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [forms, setForms] = useState<FormDTO[]>([]);
    const [media, setMedia] = useState<Media[]>([]);
    const [text, setText] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!dayBlueprintUuid || !userUuid) return;

        const fetchAllContent = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const dayData = await daysApi.dayInstancesDayBlueprintUuidUserUuidGet({
                    dayBlueprintUuid: dayBlueprintUuid,
                    userUuid: userUuid,
                });
                setDay(dayData);
                setText(dayData.blueprint.text);

                const allComponents = await daysApi.dayComponentsMapperGet({
                    limit: 100,
                    offset: 0,
                });

                const dayComponents = allComponents
                    .filter(comp => comp.id.dayBlueprintUuid === dayBlueprintUuid)
                    .sort((a, b) => a.sortOrder - b.sortOrder);
                setComponents(dayComponents);

                const taskPromises = dayComponents
                    .filter(c => c.type === 'TASK')
                    .map(async (component) => {
                        const taskData = await tasksApi.taskInstancesTaskBlueprintUuidUserUuidGet({
                            taskBlueprintUuid: component.id.componentUuid,
                            userUuid: 'current'
                        });
                        return taskData;
                    });

                const formPromises = dayComponents
                    .filter(c => c.type === 'FORM')
                    .map(async (component) => {
                        const formData = await formsApi.formInstancesFormBlueprintUuidUserUuidGet({
                            formBlueprintUuid: component.id.componentUuid,
                            userUuid: 'current'
                        });
                        return formData;
                    });

                const mediaPromises = dayComponents
                    .filter(c => c.type === 'MEDIA')
                    .map(async (component) => {
                        const mediaData = await mediaApi.mediaMediaUuidGet({
                            mediaUuid: component.id.componentUuid
                        });
                        return mediaData;
                    });

                const [taskResults, formResults, mediaResults] = await Promise.all([
                    Promise.all(taskPromises),
                    Promise.all(formPromises),
                    Promise.all(mediaPromises)
                ]);

                setTasks(taskResults);
                setForms(formResults);
                setMedia(mediaResults);
            } catch (e) {
                setError(e instanceof Error ? e : new Error('Unable to load day'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllContent();
    }, [dayBlueprintUuid, userUuid]);

    return {
        day,
        components,
        tasks,
        forms,
        media,
        text,
        isLoading,
        error,
    };
} 