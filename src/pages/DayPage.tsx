// url = /project/{projectblueprintuuid}/day/{dayorder}
// TODO render day from openapi calls and create component objects
// const DayPage = (useruuid, projectuuid, dayuuid) -> Component
// 2. button next redirects to daytransit route

import React from 'react';
import { useRouter } from 'next/router';
import type { TaskDTO, FormDTO, Media } from '../api/api-content';
import type { DayComponentsMapper } from '../api/api-course';
import { DayContent } from '@/components/DayContent';
import { DayChecklist } from '@/components/DayChecklist';
import { DayCompletion } from '@/components/DayCompletion';
import { useAuth } from '@/contexts/AuthContext';
import keycloak from '@/configs/keycloak';
import { FinancesComponent } from '@/components/FinancesComponent';
import { useDay } from '../hooks/useDay';

interface TaskComponentProps {
    task: TaskDTO;
}

interface FormComponentProps {
    form: FormDTO;
}

interface MediaComponentProps {
    media: Media;
}

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
    const { dayBlueprintUuid } = router.query;
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const userUuid = keycloak.tokenParsed?.sub;

    const {
        day,
        components,
        tasks,
        forms,
        media,
        text,
        isLoading,
        error
    } = useDay(
        typeof dayBlueprintUuid === 'string' ? dayBlueprintUuid : undefined,
        typeof userUuid === 'string' ? userUuid : undefined
    );

    if (authLoading || isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading day: {error.message}</div>;
    if (!day) return <div>Day not found</div>;

    const { blueprint, instance } = day;

    // Check if any form component matches a field in finances
    const hasFinancesForm = forms.some((form: FormDTO) => {
        const formTitle = form.blueprint.title.toLowerCase();
        return formTitle.includes('spent budget') || formTitle.includes('expense amount') || formTitle.includes('investor gave') || formTitle.includes('toys planned') || formTitle.includes('toys sold');
    });

    return (
        <div className="day-page p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{blueprint.title}</h1>
                {blueprint.description && <p className="text-gray-600">{blueprint.description}</p>}
            </div>

            {text && <DayContent content={text} />}

            {components.map((component: DayComponentsMapper) => {
                switch (component.type) {
                    case 'TASK':
                        const task = tasks.find((t: TaskDTO) => t.blueprint.taskBlueprintUuid === component.id.componentUuid);
                        return task ? <TaskComponent key={component.id.componentUuid} task={task} /> : null;
                    case 'FORM':
                        const form = forms.find((f: FormDTO) => f.blueprint.formBlueprintUuid === component.id.componentUuid);
                        return form ? <FormComponent key={component.id.componentUuid} form={form} /> : null;
                    case 'MEDIA':
                        const mediaItem = media.find((m: Media) => m.mediaUUID === component.id.componentUuid);
                        return mediaItem ? <MediaComponent key={component.id.componentUuid} media={mediaItem} /> : null;
                    default:
                        return null;
                }
            })}

            {instance.status === 'IN_PROGRESS' && (
                <DayChecklist
                    dayId={instance.id.dayBlueprintUuid}
                />
            )}

            {instance.status === 'COMPLETED' && (
                <DayCompletion
                    dayId={instance.id.dayBlueprintUuid}
                />
            )}
            <div className="mt-8 flex justify-end">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                        router.push(`/project/${router.query.projectblueprintuuid}/day/`);
                    }}
                >
                    Next Day
                </button>
            </div>

            {hasFinancesForm && (
                <FinancesComponent dayId={dayBlueprintUuid as string} />
            )}
        </div>
    );
};

export default DayPage;