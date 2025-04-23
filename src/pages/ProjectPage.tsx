// 0. url = project/{projectuuid} // pageroute
// 1. call all apis of the project 
// 2. call all days mappers and sort them to get next wip dayorder
// 3. if in progress, redirect to latest day route
// if new, show project details as "intro"
// 4. start now button redirects to day route with day order = 1

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ApiClient from '../api/ApiClient';

interface ProjectDetails {
    id: string;
    title: string;
    description: string;
    status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
    currentDayOrder?: number;
}

const ProjectPage = () => {
    const router = useRouter();
    const { projectId } = router.query;
    const [project, setProject] = useState<ProjectDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (!projectId) return;

            try {
                const apiClient = new ApiClient();
                const response = await apiClient.projects.getProjectById(projectId as string);
                setProject(response);

                // If project is in progress, redirect to the current day
                if (response.status === 'IN_PROGRESS' && response.currentDayOrder) {
                    router.push(`/project/${projectId}/day/${response.currentDayOrder}`);
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
            <h1>{project.title}</h1>
            <p>{project.description}</p>

            {project.status === 'NEW' && (
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