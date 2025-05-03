// url = /project/{projectblueprintuuid}/day/{dayorder}
// TODO render day from openapi calls and create component objects
// const DayPage = (useruuid, projectuuid, dayuuid) -> Component
// 2. button next redirects to daytransit route

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { daysApi } from '@/api-course/services/api-course';
import { tasksApi, formsApi, mediaApi } from '@/api-content/services/api-content';
import type { DayDTO, DayComponentsMapper } from '@/api-course';
import type { TaskDTO, FormDTO, Media } from '@/api-content';
import { DayContent } from '@/components/DayContent';
import { DayChecklist } from '@/components/DayChecklist';
import { DayCompletion } from '@/components/DayCompletion';
import { useAuth } from '@/contexts/AuthContext';
import keycloak from '@/configs/keycloak';

// Component interfaces
interface TaskComponentProps {
    task: TaskDTO;
}

interface FormComponentProps {
    form: FormDTO;
}

interface MediaComponentProps {
    media: Media;
}

// Component implementations
const TaskComponent: React.FC<TaskComponentProps> = ({ task }) => {
    return (
        <div className="task-component">
            <h3>{task.blueprint.title}</h3>
            {task.blueprint.description && <p>{task.blueprint.description}</p>}
            <div className="task-status">
                Status: {task.progress.status ? 'Completed' : 'In Progress'}
            </div>
        </div>
    );
};

const FormComponent: React.FC<FormComponentProps> = ({ form }) => {
    return (
        <div className="form-component">
            <h3>{form.blueprint.title}</h3>
            {form.blueprint.description && <p>{form.blueprint.description}</p>}
            {/* Form fields will be rendered here */}
        </div>
    );
};

const MediaComponent: React.FC<MediaComponentProps> = ({ media }) => {
    return (
        <div className="media-component">
            <h3>{media.title}</h3>
            {media.description && <p>{media.description}</p>}
            {media.url && (
                media.type === 'image' ? (
                    <img src={media.url} alt={media.title} />
                ) : (
                    <video src={media.url} controls />
                )
            )}
        </div>
    );
};

const DayPage: React.FC = () => {
    const router = useRouter();
    // These should match your dynamic route: /project/[projectId]/day/[dayBlueprintUuid]
    const { dayBlueprintUuid } = router.query;

    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [day, setDay] = useState<DayDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Content states
    const [components, setComponents] = useState<DayComponentsMapper[]>([]);
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [forms, setForms] = useState<FormDTO[]>([]);
    const [media, setMedia] = useState<Media[]>([]);
    const [text, setText] = useState<string | undefined>(undefined);

    // Get userUuid from Keycloak token
    const userUuid = keycloak.tokenParsed?.sub;

    // TODO add content states for fields, tasks, media, forms ans text
    //  TODO useEffect for callback all content of the day

    useEffect(() => {
        if (!dayBlueprintUuid || !userUuid || authLoading || !isAuthenticated) return;

        const fetchAllContent = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch main day data
                const dayData = await daysApi.dayInstancesDayBlueprintUuidUserUuidGet({
                    dayBlueprintUuid: dayBlueprintUuid as string,
                    userUuid: userUuid as string,
                });
                setDay(dayData);

                // Set text content
                setText(dayData.blueprint.text);

                // Fetch all components for this day
                const allComponents = await daysApi.dayComponentsMapperGet({
                    limit: 100,
                    offset: 0,
                });

                // Filter components for this day and sort by order
                const dayComponents = allComponents
                    .filter(comp => comp.id.dayBlueprintUuid === dayBlueprintUuid)
                    .sort((a, b) => a.sortOrder - b.sortOrder);
                setComponents(dayComponents);

                // Fetch detailed data for each component type
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
    }, [dayBlueprintUuid, userUuid, authLoading, isAuthenticated]);

    if (authLoading || isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading day: {error.message}</div>;
    if (!day) return <div>Day not found</div>;

    const { blueprint, instance } = day;

    return (
        <div className="day-page p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{blueprint.title}</h1>
                {blueprint.description && <p className="text-gray-600">{blueprint.description}</p>}
            </div>

            {/* Render text content */}
            {text && <DayContent content={text} />}

            {/* Render components in their defined order */}
            {components.map(component => {
                switch (component.type) {
                    case 'TASK':
                        const task = tasks.find(t => t.blueprint.taskBlueprintUuid === component.id.componentUuid);
                        return task ? <TaskComponent key={component.id.componentUuid} task={task} /> : null;
                    case 'FORM':
                        const form = forms.find(f => f.blueprint.formBlueprintUuid === component.id.componentUuid);
                        return form ? <FormComponent key={component.id.componentUuid} form={form} /> : null;
                    case 'MEDIA':
                        const mediaItem = media.find(m => m.mediaUUID === component.id.componentUuid);
                        return mediaItem ? <MediaComponent key={component.id.componentUuid} media={mediaItem} /> : null;
                    default:
                        return null;
                }
            })}

            {/* Render checklist if in progress */}
            {instance.status === 'IN_PROGRESS' && (
                <DayChecklist
                    dayId={instance.id.dayBlueprintUuid}
                />
            )}

            {/* Render completion if completed */}
            {instance.status === 'COMPLETED' && (
                <DayCompletion
                    dayId={instance.id.dayBlueprintUuid}
                />
            )}

            {/* Example: Button to go to next day */}
            <div className="mt-8 flex justify-end">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                        // Use the project blueprint uuid from the route
                        // You need to determine the next day UUID/order if you want to navigate to the next day
                        router.push(`/project/${router.query.projectblueprintuuid}/day/`); // Add next day UUID/order if available
                    }}
                >
                    Next Day
                </button>
            </div>
        </div>
    );
};

export default DayPage;