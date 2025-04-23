// 0. url = project/{projectuuid} // pageroute
// 1. call all apis of the project 
// 2. call all days mappers and sort them to get next wip dayorder
// 3. if in progress, redirect to latest day route
// if new, show project details as "intro"
// 4. start now button redirects to day route with day order = 1

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultApi from '../api/controllers/DefaultApi';
import ProjectDTO from '../api/models/ProjectDTO';
import ProjectInstance from '../api/models/ProjectInstance';

const ProjectPage = () => {
    const router = useRouter();
    const { projectId } = router.query;
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (!projectId) return;

            try {
                const api = new DefaultApi();
                const response = await new Promise<ProjectDTO>((resolve, reject) => {
                    api.projectsProjectBlueprintUuidGet(projectId as string, (error: Error | null, data: ProjectDTO) => {
                        if (error) reject(error);
                        else resolve(data);
                    });
                });
                setProject(response);

                // If project is in progress, redirect to the current day
                if (response.instance.status === ProjectInstance.StatusEnum.IN_PROGRESS) {
                    router.push(`/project/${projectId}/day/1`);
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch project details'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    const handleStartProject = () => {
        router.push(`/project/${projectId}/day/1`);
    };

    return (
        <div className="project-page">
            <h1>{project.blueprint.title}</h1>
            <p>{project.blueprint.description}</p>

            {project.instance.status === ProjectInstance.StatusEnum.IN_PROGRESS && (
                <div className="project-intro">
                    <h2>Welcome to your new project!</h2>
                    <p>Click the button below to start your journey.</p>
                    <button
                        onClick={handleStartProject}
                        className="start-project-button"
                    >
                        Start Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectPage;