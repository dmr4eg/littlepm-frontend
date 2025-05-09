// url = /projects/new
// return button redirect to dashboard route
// 1. get all project blueprints
// 2. create grid component for projects 
// 3. send post request to create project instance
// 4. redirect to project route with blueprint uuid

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { projectsApi } from '@/api-course/services/api-course'
import type {
    ProjectBlueprint,
    ProjectDTO,
    ProjectInstance
} from '@/api-course';  // generated models

const ProjectCreatePage: React.FC = () => {
    const router = useRouter();
    const [blueprints, setBlueprints] = useState<ProjectBlueprint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadBlueprints = async () => {
            try {
                const data = await projectsApi.projectsGet({ limit: 100, offset: 0 });
                setBlueprints(data);
            } catch (e) {
                setError(e instanceof Error ? e : new Error('Unable to load projects'));
            } finally {
                setIsLoading(false);
            }
        };

        loadBlueprints();
    }, []);

    const handleCreate = async (blueprintId: string) => {
        try {
            const body: ProjectInstance = {
                id: { projectBlueprintUuid: blueprintId, userUuid: '' },
                status: 'IN_PROGRESS',
            };

            const dto: ProjectDTO = await projectsApi.projectInstancesPost({
                projectInstance: body,
            });

            router.push(
                `/project/${dto.instance.id.projectBlueprintUuid}`,
            );
        } catch (e) {
            console.error('Project creation failed:', e);
        }
    };

    if (isLoading) return <div>Loading…</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="project-create-page">
            <h1>Create New Project</h1>

            <button onClick={() => router.push('/dashboard')} className="back-button">
                Back to Dashboard
            </button>

            <div className="project-grid">
                {blueprints.map(bp => (
                    <div key={bp.projectBlueprintUuid} className="project-card">
                        {bp.posterUrl && (
                            <img src={bp.posterUrl} alt={bp.title} className="project-image" />
                        )}

                        <h3>{bp.title}</h3>
                        <p>{bp.description}</p>

                        <button
                            className="create-button"
                            onClick={() => handleCreate(bp.projectBlueprintUuid)}>
                            Create Project
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectCreatePage;