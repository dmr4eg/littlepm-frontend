// url = /projects
// button create project redirect to create project route
// 1. api get all projects
// 2. devide projects by state into 2 lists
// 3. create 2 carousels with 2 lists 
// 4. on the card open project route with blueprint uuid

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

const DashboardPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Projects</h1>
                <Link
                    to="/projects/new"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Start New Project
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.uuid} project={project} />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;