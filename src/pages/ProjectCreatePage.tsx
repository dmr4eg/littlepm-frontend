// url = /projects/new
// return button redirect to dashboard route
// 1. get all project blueprints
// 2. create grid component for projects 
// 3. send post request to create project instance
// 4. redirect to project route with blueprint uuid

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../api/api';
import ProjectBlueprint from '../api/models/ProjectBlueprint';
import ProjectDTO from '../api/models/ProjectDTO';

const ProjectCreatePage = () => {
    const router = useRouter();
    const [blueprints, setBlueprints] = useState<ProjectBlueprint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBlueprints = async () => {
            try {
                const response = await new Promise<ProjectBlueprint[]>((resolve, reject) => {
                    api.projectsGet(100, 0, (error: Error | null, data: ProjectBlueprint[]) => {
                        if (error) reject(error);
                        else resolve(data);
                    });
                });
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
            const response = await new Promise<ProjectDTO>((resolve, reject) => {
                api.projectsPost({
                    blueprint: blueprintId,
                    title: `New Project from ${blueprints.find(b => b.project_blueprint_uuid === blueprintId)?.title}`,
                    description: 'Created from template'
                }, (error: Error | null, data: ProjectDTO) => {
                    if (error) reject(error);
                    else resolve(data);
                });
            });
            router.push(`/project/${response.instance.id.projectBlueprintUuid}`);
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
                    <div key={blueprint.project_blueprint_uuid} className="project-card">
                        {blueprint.poster_url && (
                            <img
                                src={blueprint.poster_url}
                                alt={blueprint.title}
                                className="project-image"
                            />
                        )}
                        <h3>{blueprint.title}</h3>
                        <p>{blueprint.description}</p>
                        <button
                            onClick={() => handleCreateProject(blueprint.project_blueprint_uuid)}
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