// url = /reg
// login button = /login
// regfield 
// passwordfiled
// keycloak callback and redirect = /

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DefaultApi from '../api/controllers/DefaultApi';
import Members from '../api/models/Members';

const RegistrationPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const api = new DefaultApi();
            await new Promise<Members>((resolve, reject) => {
                api.membersPost({
                    id: {
                        userUuid: email, // Using email as userUuid for now
                        projectBlueprintUuid: 'default'
                    },
                    member_name: name
                }, (error: Error | null, data: Members) => {
                    if (error) reject(error);
                    else resolve(data);
                });
            });
            router.push('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        }
    };

    return (
        <div className="registration-page">
            <h1>Register</h1>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            <p>
                Already have an account?{' '}
                <Link href="/login">Login here</Link>
            </p>
        </div>
    );
};

export default RegistrationPage;
