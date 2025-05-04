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
import type { Finances } from '@/api-course/models/Finances';
import { computeFinances, validateFinances, FinancesPrimitives } from '@/lib/finances';

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

    // Use FinancesPrimitives for user input
    const [financesInput, setFinancesInput] = useState<FinancesPrimitives>({
        spentBudget: 0,
        expenseAmount: 0,
        investorGave: 0,
        toysPlanned: 1,
        toysSold: 0,
    });
    const [helpersPercents, setHelpersPercents] = useState<number[]>([]);

    // Compute derived finances and validate
    let finances: Finances;
    let errors: string[] = [];
    let warnings: string[] = [];
    try {
        finances = computeFinances(financesInput);
        const validation = validateFinances(finances, helpersPercents);
        errors = validation.errors;
        warnings = validation.warnings;
    } catch (e: any) {
        finances = {
            id: { projectBlueprintUuid: '', userUuid: '' },
            spentBudget: 0,
            expenseAmount: 0,
            investorGave: 0,
            toysPlanned: 1,
            toysSold: 0,
            toysLeft: 0,
            calculatedBudget: 0,
            investorReturn: 0,
            itemsCost: 0,
            pricePerItem: 0,
            recommendedPrice: 0,
            soldPrice: 0,
            membersBudget: 0,
            profit: 0,
        };
        errors = [e.message];
        warnings = [];
    }

    // TODO add content states for fields, tasks, media, forms ans text
    //  TODO useEffect for callback all content of the day

    useEffect(() => {
        if (!dayBlueprintUuid || !userUuid || authLoading || !isAuthenticated) return;

        const fetchAllContent = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const dayData = await daysApi.dayInstancesDayBlueprintUuidUserUuidGet({
                    dayBlueprintUuid: dayBlueprintUuid as string,
                    userUuid: userUuid as string,
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

            {text && <DayContent content={text} />}

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
                        router.push(`/project/${router.query.projectblueprintuuid}/day/`); // Add next day UUID/order if available
                    }}
                >
                    Next Day
                </button>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-2">Financials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="number"
                        value={financesInput.spentBudget}
                        onChange={e => setFinancesInput(f => ({ ...f, spentBudget: Number(e.target.value) }))}
                        placeholder="Spent Budget"
                        className="border rounded px-2 py-1"
                    />
                    <input
                        type="number"
                        value={financesInput.expenseAmount}
                        onChange={e => setFinancesInput(f => ({ ...f, expenseAmount: Number(e.target.value) }))}
                        placeholder="Other Expenses"
                        className="border rounded px-2 py-1"
                    />
                    <input
                        type="number"
                        value={financesInput.investorGave}
                        onChange={e => setFinancesInput(f => ({ ...f, investorGave: Number(e.target.value) }))}
                        placeholder="Investor Gave"
                        className="border rounded px-2 py-1"
                    />
                    <input
                        type="number"
                        value={financesInput.toysPlanned}
                        onChange={e => setFinancesInput(f => ({ ...f, toysPlanned: Number(e.target.value) }))}
                        placeholder="Toys Planned"
                        className="border rounded px-2 py-1"
                    />
                    <input
                        type="number"
                        value={financesInput.toysSold}
                        onChange={e => setFinancesInput(f => ({ ...f, toysSold: Number(e.target.value) }))}
                        placeholder="Toys Sold"
                        className="border rounded px-2 py-1"
                    />
                </div>
                {/* Helpers percents input (example for 2 helpers) */}
                <div className="mt-4">
                    <label className="block font-medium">Helpers' % (comma separated):</label>
                    <input
                        type="text"
                        value={helpersPercents.join(',')}
                        onChange={e => setHelpersPercents(
                            e.target.value
                                .split(',')
                                .map(s => parseFloat(s.trim()))
                                .filter(n => !isNaN(n))
                        )}
                        placeholder="e.g. 20,30"
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>
                {/* Show validation messages */}
                {errors.length > 0 && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-2 mt-4">
                        {errors.map((err, i) => <div key={i}>{err}</div>)}
                    </div>
                )}
                {warnings.length > 0 && (
                    <div className="bg-yellow-100 text-yellow-700 p-2 rounded mb-2">
                        {warnings.map((warn, i) => <div key={i}>{warn}</div>)}
                    </div>
                )}
                {/* Show calculated results */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>Calculated Budget: <b>{finances.calculatedBudget}</b></div>
                    <div>Investor Return: <b>{finances.investorReturn}</b></div>
                    <div>Items Cost: <b>{finances.itemsCost}</b></div>
                    <div>Price Per Item: <b>{finances.pricePerItem}</b></div>
                    <div>Recommended Price: <b>{finances.recommendedPrice}</b></div>
                    <div>Sold Price: <b>{finances.soldPrice}</b></div>
                    <div>Members Budget: <b>{finances.membersBudget}</b></div>
                    <div>Profit: <b>{finances.profit}</b></div>
                    <div>Toys Left: <b>{finances.toysLeft}</b></div>
                </div>
            </div>
        </div>
    );
};

export default DayPage;