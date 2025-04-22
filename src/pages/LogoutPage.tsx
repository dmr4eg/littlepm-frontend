// url = /logout
// show verify window
// delete jwt cookies 

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const LogoutPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                });
                localStorage.removeItem('auth');
                router.push('/');
            } catch (error) {
                console.error('Logout failed:', error);
                router.push('/');
            }
        };

        handleLogout().then(r => {
            console.log("Logout completed");
        }).catch(e => {
            console.error("Logout error:", e);
        });
    }, [router]);

    return <div>Logging out...</div>;
};

export default LogoutPage; 
