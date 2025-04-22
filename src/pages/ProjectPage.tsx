// 0. url = project/{projectuuid} // pageroute
// 1. call all apis of the project 
// 2. call all days mappers and sort them to get next wip dayorder
// 3. if in progress, redirect to latest day route
// if new, show project details as "intro"
// 4. start now button redirects to day route with day order = 1

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';

const ProjectPage: React.FC = () => {
    const { blueprintuuid } = useParams<{ blueprintuuid: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${blueprintuuid}`);
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
    }, [blueprintuuid]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{project.title}</h1>
                    <p className="text-lg text-gray-600">{project.description}</p>
                </div>
                {project.status === 'IN_PROGRESS' && project.currentDay && (
                    <Link
                        to={`/project/${project.uuid}/day/${project.currentDay}`}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Continue Project
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Project Status</h2>
                    <div className="p-4 bg-white rounded-lg shadow">
                        <p>Status: {project.status}</p>
                        {project.currentDay && <p>Current Day: {project.currentDay}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Days</h2>
                    <div className="space-y-2">
                        {project.days.map((day) => (
                            <div
                                key={day.order}
                                className={`p-4 rounded-lg ${day.isCompleted
                                    ? 'bg-green-100'
                                    : day.order === project.currentDay
                                        ? 'bg-blue-100'
                                        : 'bg-gray-100'
                                    }`}
                            >
                                <h3 className="font-medium">Day {day.order}</h3>
                                <p className="text-sm text-gray-600">{day.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;