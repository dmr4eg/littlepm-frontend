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
import api from '../api/api';

const ProjectPage = () => {
    const router = useRouter();
    const { projectId } = router.query;
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);

    /**
    * This effect fetches the project details when the component mounts or when the projectId changes.
    * It sets the loading state, handles errors, and updates the project state.
    **/
    useEffect(() => {
        const callback = (error: Error | null, data: ProjectDTO) => {
            if (error) setError(error.message)
            else setProject(data);
            setIsLoading(false);
        }

        const loadProject = async () => {
            if (!projectId) {
                setError('Project ID is required');
                setIsLoading(false);
                return;
            }
            try {
                // Assumes your SDK method already returns a Promise
                await api.projectsProjectBlueprintUuidGet(projectId as string, callback);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Failed to fetch project details');
            } finally {
                setIsLoading(false);
            }
        };

        loadProject();
    }, [projectId, router]);

    // TODO create setproject checker for check project update
    // if project instance state is new, redirect to welcome page
    // else redirect ot last day

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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