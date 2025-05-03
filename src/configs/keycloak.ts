import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'https://auth.app.little.pm/',
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'master',
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'master-frontend'
};

// @ts-ignore
const keycloak = new Keycloak(keycloakConfig);

export default keycloak; 