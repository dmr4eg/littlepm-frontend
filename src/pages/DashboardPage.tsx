// url = /projects
// button create project redirect to create project route
// 1. api get all projects
// 2. devide projects by state into 2 lists
// 3. create 2 carousels with 2 lists
// 4. on the card open project route with blueprint uuid

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { projectsApi } from '@/api-course/services/api-course';
import type { ProjectDTO } from '@/api-course';
import { Button } from '@/components/ui/button';
import ProjectCarousel from '@/components/ProjectCarousel';

const DashboardPage: React.FC = () => {
    const router = useRouter();
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await projectsApi.projectInstancesGet({
                    limit: 100,
                    offset: 0,
                    userUuid: '' // TODO: Get actual user UUID
                });
                setProjects(data);
            } catch (e) {
                setError(e instanceof Error ? e : new Error('Unable to load projects'));
            } finally {
                setIsLoading(false);
            }
        };

        loadProjects();
    }, []);

    const inProgressProjects = projects.filter(p => p.instance.status === 'IN_PROGRESS');
    const completedProjects = projects.filter(p => p.instance.status === 'COMPLETED');

    const handleProjectClick = (projectId: string) => {
        router.push(`/project/${projectId}`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="dashboard p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button
                    onClick={() => router.push('/project/create')}
                    className="create-project-button"
                >
                    Create New Project
                </Button>
            </div>

            <div className="projects-section space-y-8">
                <ProjectCarousel
                    title="In Progress Projects"
                    projects={inProgressProjects}
                    onProjectClick={handleProjectClick}
                />

                <ProjectCarousel
                    title="Completed Projects"
                    projects={completedProjects}
                    onProjectClick={handleProjectClick}
                />
            </div>
        </div>
    );
};

export default DashboardPage;