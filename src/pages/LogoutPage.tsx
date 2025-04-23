// url = /logout
// show verify window
// delete jwt cookies 

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        // TODO: Implement logout logic (clear JWT cookies)
        const handleLogout = async () => {
            try {
                // Clear cookies and local storage
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
                });
                localStorage.clear();

                // Redirect to login page
                router.push('/login');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        handleLogout();
    }, [router]);

    return (
        <div className="logout-page">
            <h1>Logging out...</h1>
            <p>Please wait while we log you out.</p>
        </div>
    );
};

export default LogoutPage; 
