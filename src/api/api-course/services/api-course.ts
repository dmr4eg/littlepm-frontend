import {
    Configuration,
    DaysApi,
    FinancesApi,
    MembersApi,
    ProjectsApi
} from '@/api/api-course'; // generated from openapi spec

import config from '../../../configs/api-course.json';

const apiCfg = new Configuration({
    basePath: config.api.API_BASE_URL,
    accessToken: () => localStorage.getItem('jwt') ?? ''
});

export const daysApi = new DaysApi(apiCfg);
export const financesApi = new FinancesApi(apiCfg);
export const membersApi = new MembersApi(apiCfg);
export const projectsApi = new ProjectsApi(apiCfg);


export default {
    daysApi,
    financesApi,
    membersApi,
    projectsApi
}


