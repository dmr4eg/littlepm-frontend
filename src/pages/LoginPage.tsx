// url = /login
// register button = /register
// loginfield 
// passwordfiled
// keycloak callback and redirect = /

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import keycloak from '@/configs/keycloak';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleLogin = () => {
        keycloak.login();
    };

    // Close modal handler
    const handleClose = () => {
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-between bg-yellow-100 relative">
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
                        onClick={handleLogin}
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
                    <button
                        className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black focus:outline-none"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <h2 className="text-2xl font-handwriting font-bold mb-6 text-center text-black">Login</h2>
                    <form className="w-full flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                                placeholder="Enter your name"
                                autoComplete="username"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                disabled
                            />
                        </div>
                        <div className="flex justify-end mb-2">
                            <a href="#" className="text-xs text-blue-700 hover:underline">Forgot Password?</a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-full font-bold text-lg shadow hover:bg-gray-800 transition mb-2"
                        >
                            LOGIN
                        </button>
                        <button
                            type="button"
                            className="w-full bg-white text-black border border-black py-2 rounded-full font-bold text-lg shadow hover:bg-gray-100 transition"
                            onClick={() => router.push('/register')}
                        >
                            NEW HERE?
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-2">Password recovery link will be sent to the email of your proof</p>
                    </form>
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

export default LoginPage;
