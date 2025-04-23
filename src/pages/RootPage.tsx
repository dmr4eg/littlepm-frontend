import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiClient from '../api/ApiClient';

const RootPage = () => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const apiClient = new ApiClient();
                await apiClient.users.getCurrentUser();
                // If we get here, the user is authenticated
                router.push('/dashboard');
            } catch (error) {
                // If we get an error, the user is not authenticated
                router.push('/login');
            }
        };

        checkAuth();
    }, [router]);

    return (
        <div className="root-page">
            <h1>Loading...</h1>
            <p>Please wait while we check your authentication status.</p>
        </div>
    );
};

export default RootPage;