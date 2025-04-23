// url = /projects/new
// return button redirect to dashboard route
// 1. get all project blueprints
// 2. create grid component for projects 
// 3. send post request to create project instance
// 4. redirect to project route with blueprint uuid

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiClient from '../api/ApiClient';

interface ProjectBlueprint {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
}

const ProjectCreatePage = () => {
    const router = useRouter();
    const [blueprints, setBlueprints] = useState<ProjectBlueprint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBlueprints = async () => {
            try {
                const apiClient = new ApiClient();
                const response = await apiClient.projects.getProjectBlueprints();
                setBlueprints(response);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch project blueprints'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlueprints();
    }, []);

    const handleCreateProject = async (blueprintId: string) => {
        try {
            const apiClient = new ApiClient();
            const response = await apiClient.projects.createProject({
                blueprintId,
                title: `New Project from ${blueprints.find(b => b.id === blueprintId)?.title}`,
                description: 'Created from template'
            });
            router.push(`/project/${response.id}`);
        } catch (err) {
            console.error('Failed to create project:', err);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="project-create-page">
            <h1>Create New Project</h1>
            <button
                onClick={() => router.push('/dashboard')}
                className="back-button"
            >
                Back to Dashboard
            </button>

            <div className="project-grid">
                {blueprints.map(blueprint => (
                    <div key={blueprint.id} className="project-card">
                        {blueprint.imageUrl && (
                            <img
                                src={blueprint.imageUrl}
                                alt={blueprint.title}
                                className="project-image"
                            />
                        )}
                        <h3>{blueprint.title}</h3>
                        <p>{blueprint.description}</p>
                        <button
                            onClick={() => handleCreateProject(blueprint.id)}
                            className="create-button"
                        >
                            Create Project
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectCreatePage;