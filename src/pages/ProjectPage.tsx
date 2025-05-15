// url = project/{projectuuid}
// 1. call all apis of the project 
// 2. call all days mappers and sort them to get next wip dayorder
// 3. if in progress, redirect to latest day route
// if new, show project details as "intro"
// 4. start now button redirects to day route with day order = 1

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { projectsApi, daysApi } from '@/api/api-course/services/api-course';
import type { ProjectDTO, ProjectDaysMapper } from 'src/api/api-course';
import { ProjectInstanceStatusEnum } from '@/api/api-course/models/ProjectInstance';
import { DayInstanceStatusEnum } from '@/api/api-course/models/DayInstance';
import { useAuth } from '@/contexts/AuthContext';
import keycloak from '@/configs/keycloak';

interface DayWithStatus extends ProjectDaysMapper {
    status: DayInstanceStatusEnum;
}

const ProjectPage: React.FC = () => {
    const router = useRouter();
    const { projectblueprintuuid } = router.query;
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [nextDayOrder, setNextDayOrder] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const userUuid = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (!projectblueprintuuid || !userUuid || authLoading || !isAuthenticated) return;

        const fetchProjectData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const projectData = await projectsApi.projectInstancesProjectBlueprintUuidUserUuidGet({
                    projectBlueprintUuid: projectblueprintuuid as string,
                    userUuid: userUuid as string,
                });
                setProject(projectData);
                if (projectData.instance.status === ProjectInstanceStatusEnum.InProgress) {
                    const daysMapping = await projectsApi.projectDaysMapperGet({
                        limit: 100,
                        offset: 0,
                    });
                    const projectDays = daysMapping
                        .filter(mapper => mapper.id.projectBlueprintUuid === projectblueprintuuid)
                        .sort((a, b) => a.sortOrder - b.sortOrder);

                    const dayInstancesPromises = projectDays.map(async (day) => {
                        const dayData = await daysApi.dayInstancesDayBlueprintUuidUserUuidGet({
                            dayBlueprintUuid: day.id.dayBlueprintUuid,
                            userUuid: userUuid as string,
                        });
                        return {
                            ...day,
                            status: dayData.instance.status
                        } as DayWithStatus;
                    });
                    const daysWithStatus = await Promise.all(dayInstancesPromises);
                    const nextDay = daysWithStatus.find(day => day.status === DayInstanceStatusEnum.InProgress);
                    if (nextDay) {
                        setNextDayOrder(nextDay.sortOrder);
                        router.push(`/project/${projectblueprintuuid}/day/${nextDay.sortOrder}`);
                    }
                }
            } catch (e) {
                setError(e instanceof Error ? e : new Error('Failed to fetch project details'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectData();
    }, [projectblueprintuuid, userUuid, authLoading, isAuthenticated, router]);

    if (authLoading || isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!project) return <div>Project not found</div>;

    const handleStartProject = () => {
        router.push(`/project/${projectblueprintuuid}/day/1`);
    };

    return (
        <div className="project-page p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">{project.blueprint.title}</h1>
                    {project.blueprint.description && (
                        <p className="text-lg text-gray-600">{project.blueprint.description}</p>
                    )}
                </div>

                {project.instance.status === ProjectInstanceStatusEnum.InProgress && !nextDayOrder && (
                    <div className="project-intro bg-white rounded-lg shadow-lg p-8 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Welcome to your new project!</h2>
                        <p className="text-gray-600 mb-8">
                            Get ready to start your journey. Click the button below to begin.
                        </p>
                        <button
                            onClick={handleStartProject}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Start Now
                        </button>
                    </div>
                )}

                {project.instance.status === ProjectInstanceStatusEnum.InProgress && nextDayOrder && (
                    <div className="project-progress bg-white rounded-lg shadow-lg p-8 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Continue Your Progress</h2>
                        <p className="text-gray-600 mb-8">
                            You are making great progress! Continue with Day {nextDayOrder}.
                        </p>
                        <button
                            onClick={() => router.push(`/project/${projectblueprintuuid}/day/${nextDayOrder}`)}
                            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Continue Project
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;