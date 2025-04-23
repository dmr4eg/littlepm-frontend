// url = /profile/
// 1. get user api info
// 2. show user info
// 3. return button redirect to root route

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiClient from '../api/ApiClient';

interface UserProfile {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
}

const ProfilePage = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const apiClient = new ApiClient();
                const response = await apiClient.users.getCurrentUser();
                setProfile(response);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch user profile'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!profile) {
        return <div>Profile not found</div>;
    }

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <button
                onClick={() => router.push('/')}
                className="back-button"
            >
                Back to Home
            </button>

            <div className="profile-content">
                {profile.avatarUrl && (
                    <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="profile-avatar"
                    />
                )}
                <div className="profile-info">
                    <h2>{profile.name}</h2>
                    <p>{profile.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;