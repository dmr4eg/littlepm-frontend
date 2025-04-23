// url = /project/{projectblueprintuuid}/complete
// 1. get api project info
// 2. show congrats
// button complete redirect to Dashboard route

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiClient from '../api/ApiClient';

interface ProjectDetails {
    id: string;
    title: string;
    description: string;
    completionDate?: string;
}

const ProjectCompletePage = () => {
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
                const response = await apiClient.getProjectDetails(projectId as string);
                setProject(response);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch project details'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="project-complete-page">
            <h1>Congratulations!</h1>
            <div className="completion-message">
                <h2>You've completed {project.title}!</h2>
                <p>{project.description}</p>
                {project.completionDate && (
                    <p>Completed on: {new Date(project.completionDate).toLocaleDateString()}</p>
                )}
            </div>
            <button
                onClick={() => router.push('/dashboard')}
                className="dashboard-button"
            >
                Return to Dashboard
            </button>
        </div>
    );
};

export default ProjectCompletePage;