// url = /profile/
// 1. get user api info
// 2. show user info
// 3. return button redirect to root route

import React, { useEffect, useState } from 'react';
import { User } from '../types';

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/user/profile');
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Profile</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <div className="p-4 bg-white rounded-lg shadow space-y-4">
                        <div>
                            <p className="text-sm text-gray-600">Username</p>
                            <p className="font-medium">{user.username}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Projects</h2>
                    <div className="p-4 bg-white rounded-lg shadow">
                        <p className="text-2xl font-bold">{user.projects.length}</p>
                        <p className="text-sm text-gray-600">Total Projects</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;