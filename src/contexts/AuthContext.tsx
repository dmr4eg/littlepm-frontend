import React, { createContext, useContext, useEffect, useState } from 'react';
import keycloak from '../configs/keycloak';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    token: null,
    login: () => { },
    logout: () => { }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const initKeycloak = async () => {
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
                    pkceMethod: 'S256'
                });

                setIsAuthenticated(authenticated);
                if (authenticated) {
                    setToken(keycloak.token || null);
                }
            } catch (error) {
                console.error('Failed to initialize Keycloak:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initKeycloak();
    }, []);

    const login = () => {
        keycloak.login();
    };

    const logout = () => {
        keycloak.logout();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}; 