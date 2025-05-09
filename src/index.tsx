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
const root = createRoot(container);        // ← from react-dom/client
root.render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={initOptions}
        LoadingComponent={<LoadingPage />}
    >
        <App />
    </ReactKeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
