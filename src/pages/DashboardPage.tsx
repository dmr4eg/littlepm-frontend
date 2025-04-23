import React from 'react';
import { useRouter } from 'next/router';

const DashboardPage = () => {
    const router = useRouter();

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="projects-section">
                <h2>Your Projects</h2>
                {/* Project lists will be implemented here */}
                <button
                    onClick={() => router.push('/project/create')}
                    className="create-project-button"
                >
                    Create New Project
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;