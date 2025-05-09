// import { StrictMode } from 'react'

import './styles/index.css'
import App from './App'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './configs/keycloak'
import { createRoot } from 'react-dom/client'
// import Dashboard from './pages/Dashboard.tsx'

const initOptions = {
    onLoad: 'login-required',
    checkLoginIframe: false,
};

const LoadingPage = () => (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Keycloak is loading</h2>
        <p>Loading...</p>
    </div>
);

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={initOptions}
        LoadingComponent={<LoadingPage />}
    >
        <App />
    </ReactKeycloakProvider>
);

// reportWebVitals();
