// url = /projects/new
// return button redirect to dashboard route
// 1. get all project blueprints
// 2. create grid component for projects 
// 3. send post request to create project instance
// 4. redirect to project route with blueprint uuid

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ProjectBlueprint } from '../types';

const ProjectCreatePage: React.FC = () => {
    const [blueprints, setBlueprints] = useState<ProjectBlueprint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchBlueprints = async () => {
            try {
                const response = await fetch('/api/project-blueprints');
                if (!response.ok) {
                    throw new Error('Failed to fetch project blueprints');
                }
                const data = await response.json();
                setBlueprints(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchBlueprints();
    }, []);

    const handleCreateProject = async (blueprintUuid: string) => {
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ blueprintUuid }),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            const project = await response.json();
            router.push(`/project/${project.uuid}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Create New Project</h1>
                <button
                    onClick={() => router.push('/projects')}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blueprints.map((blueprint) => (
                    <div
                        key={blueprint.uuid}
                        className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleCreateProject(blueprint.uuid)}
                    >
                        <h2 className="text-xl font-semibold mb-2">{blueprint.title}</h2>
                        <p className="text-gray-600 mb-4">{blueprint.description}</p>
                        <div className="text-sm text-gray-500">
                            Difficulty: {blueprint.difficulty} | Duration: {blueprint.estimatedDuration}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectCreatePage;