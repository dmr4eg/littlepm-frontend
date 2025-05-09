// url = /logout
// show verify window
// delete jwt cookies 

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import keycloak from '@/configs/keycloak';

const LogoutPage: React.FC = () => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleLogout = async () => {
        setIsProcessing(true);
        try {
            document.cookie.split(';').forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, '')
                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            });
            localStorage.clear();
            keycloak.logout({ redirectUri: window.location.origin + '/login' });
        } catch (error) {
            setIsProcessing(false);
            console.error('Logout failed:', error);
        }
    };

    const handleCancel = () => {
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-yellow-100 relative">
            {/* Header */}
            <header className="w-full flex justify-between items-center px-8 py-4 bg-yellow-300 rounded-b-3xl shadow-md">
                <div className="text-xl font-handwriting font-bold text-black">Little Project Manager</div>
                <div className="space-x-4">
                    <button
                        className="bg-black text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-gray-800 transition"
                        onClick={() => router.push('/dashboard')}
                    >
                        START NOW
                    </button>
                    <button
                        className="bg-white text-black rounded-full px-6 py-2 font-semibold border border-black shadow hover:bg-gray-100 transition"
                        onClick={() => router.push('/login')}
                    >
                        LOGIN
                    </button>
                </div>
            </header>

            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/login-bg-blur.jpg"
                    alt="Background"
                    className="w-full h-full object-cover blur-md opacity-60 rounded-3xl"
                />
            </div>
            <main className="flex-grow flex items-center justify-center z-10 relative">
                <div className="bg-[#F8E9D2] rounded-2xl shadow-2xl px-10 py-8 w-full max-w-md flex flex-col items-center relative border border-yellow-200">
                    <h2 className="text-2xl font-handwriting font-bold mb-6 text-center text-black">Logout</h2>
                    <p className="mb-8 text-center text-gray-700 text-lg">Are you sure you want to log out?</p>
                    <div className="flex flex-col gap-4 w-full">
                        <button
                            onClick={handleLogout}
                            disabled={isProcessing}
                            className="w-full bg-black text-white py-2 rounded-full font-bold text-lg shadow hover:bg-gray-800 transition mb-2 disabled:opacity-60"
                        >
                            {isProcessing ? 'Logging out...' : 'LOGOUT'}
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isProcessing}
                            className="w-full bg-white text-black border border-black py-2 rounded-full font-bold text-lg shadow hover:bg-gray-100 transition"
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            </main>
            <footer className="w-full bg-yellow-300 rounded-t-3xl px-8 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-black z-10 relative">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    <span>Email: info@little.pm</span>
                    <span>|</span>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">Terms of Use</a>
                </div>
                <div className="flex items-center space-x-4">
                    <span>Connect with us:</span>
                    <a href="#" aria-label="YouTube"><span className="inline-block w-5 h-5 bg-black rounded-full"></span></a>
                    <a href="#" aria-label="Instagram"><span className="inline-block w-5 h-5 bg-black rounded-full"></span></a>
                    <a href="#" aria-label="Telegram"><span className="inline-block w-5 h-5 bg-black rounded-full"></span></a>
                    <a href="#" aria-label="VK"><span className="inline-block w-5 h-5 bg-black rounded-full"></span></a>
                </div>
            </footer>
        </div>
    );
};

export default LogoutPage; 
