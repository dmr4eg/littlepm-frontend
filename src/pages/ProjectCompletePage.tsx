// url = /project/{projectblueprintuuid}/complete
// 1. get api project info
// 2. show congrats
// button complete redirect to Dashboard route

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DefaultApi from '../api/controllers/DefaultApi';
import ProjectDTO from '../api/models/ProjectDTO';

const ProjectCompletePage = () => {
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
                <h2>You've completed {project.blueprint.title}!</h2>
                <p>{project.blueprint.description}</p>
                {project.instance.completionDate && (
                    <p>Completed on: {new Date(project.instance.completionDate).toLocaleDateString()}</p>
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