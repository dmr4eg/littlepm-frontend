// url = /project/{projectblueprintuuid}/complete
// 1. get api project info
// 2. show congrats
// button complete redirect to Dashboard route

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { projectsApi } from '@/api/api-course/services/api-course';
import type { ProjectDTO } from 'src/api/api-course';
import { useAuth } from '@/contexts/AuthContext';
import keycloak from '@/configs/keycloak';

const ProjectCompletePage: React.FC = () => {
    const router = useRouter();
    const { projectblueprintuuid } = router.query;
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const userUuid = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (!projectblueprintuuid || !userUuid || authLoading || !isAuthenticated) return;

        const fetchProjectDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const projectData = await projectsApi.projectInstancesProjectBlueprintUuidUserUuidGet({
                    projectBlueprintUuid: projectblueprintuuid as string,
                    userUuid: userUuid as string,
                });
                setProject(projectData);
            } catch (e) {
                setError(e instanceof Error ? e : new Error('Failed to fetch project details'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectblueprintuuid, userUuid, authLoading, isAuthenticated]);

    if (authLoading || isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div className="project-complete-page p-6">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-6">Congratulations!</h1>
                    <div className="completion-message space-y-4">
                        <h2 className="text-2xl font-semibold">
                            You've completed {project.blueprint.title}!
                        </h2>
                        {project.blueprint.description && (
                            <p className="text-lg text-gray-600">
                                {project.blueprint.description}
                            </p>
                        )}
                        {project.instance.endDate && (
                            <p className="text-gray-600">
                                Completed on: {new Date(project.instance.endDate).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Return to Dashboard
                    </button>
                </div>

                {project.instance.feedback && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Project Feedback</h3>
                        <p className="text-gray-600">{project.instance.feedback}</p>
                    </div>
                )}

                {project.instance.whatWentWell && (
                    <div className="mt-8 p-6 bg-green-50 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">What Went Well</h3>
                        <p className="text-gray-600">{project.instance.whatWentWell}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCompletePage;