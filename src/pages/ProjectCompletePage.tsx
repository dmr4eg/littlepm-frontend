// url = /project/{projectblueprintuuid}/complete
// 1. get api project info
// 2. show congrats
// button complete redirect to Dashboard route

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';

const ProjectCompletePage: React.FC = () => {
    const { projectblueprintuuid } = useParams<{ projectblueprintuuid: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${projectblueprintuuid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch project');
                }
                const data = await response.json();
                setProject(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectblueprintuuid]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div className="space-y-8 text-center">
            <h1 className="text-4xl font-bold text-green-600">Project Completed!</h1>
            <p className="text-xl">Congratulations on completing {project.title}!</p>

            <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-semibold">Project Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg shadow">
                        <p className="font-medium">Total Days</p>
                        <p className="text-2xl">{project.days.length}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow">
                        <p className="font-medium">Completed Days</p>
                        <p className="text-2xl">
                            {project.days.filter((day) => day.isCompleted).length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-x-4">
                <Link
                    to="/projects"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Back to Projects
                </Link>
                <Link
                    to={`/projects/${project.blueprintUuid}`}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    View Project Details
                </Link>
            </div>
        </div>
    );
};

export default ProjectCompletePage;