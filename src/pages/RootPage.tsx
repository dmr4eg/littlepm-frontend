import React from 'react';
import Link from 'next/link';

const RootPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="max-w-4xl w-full space-y-8 text-center">
                <h1 className="text-5xl font-bold">Welcome to Project Studio</h1>
                <p className="text-xl text-gray-600">
                    Start your journey of learning and creating amazing projects
                </p>

                <div className="space-x-4">
                    <Link
                        href="/projects"
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        View Projects
                    </Link>
                    <Link
                        href="/projects/new"
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Start New Project
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RootPage;