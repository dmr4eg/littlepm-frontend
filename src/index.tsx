// import { StrictMode } from 'react'

import './styles/index.css'
import App from './App.tsx'
// import {ReactKeycloakProvider} from "@react-keycloak/web";
// import {initOptions, keycloak} from "./config/keycloakConfig.ts";
// import loadingPage from "./pages/LoadingPage.tsx";
import { createRoot } from 'react-dom/client';
// import Dashboard from './pages/Dashboard.tsx'

const container = document.getElementById('root')!;
const root = createRoot(container);        // ← from react-dom/client
root.render(

    // <ReactKeycloakProvider
    //     authClient={keycloak}
    //     initOptions={initOptions}
    //     LoadingComponent={loadingPage(
    //         "Keycloak is loading",
    //         "Loading"
    //     )}
    // >
        <App />
    // </ReactKeycloakProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
