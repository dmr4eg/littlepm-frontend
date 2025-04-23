import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const RootPage = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading, login } = useAuth();

    React.useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                router.push('/dashboard');
            } else {
                login();
            }
        }
    }, [isLoading, isAuthenticated, router, login]);

    return (
        <div className="root-page">
            <h1>Loading...</h1>
            <p>Please wait while we check your authentication status.</p>
        </div>
    );
};

export default RootPage;