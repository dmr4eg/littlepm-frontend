import {
    Configuration,
    TasksApi,
    FormsApi,
    MediaApi,
} from '@/api/api-content'; // generated from openapi spec

import config from '../../../configs/api-content.json';

const apiCfg = new Configuration({
    basePath: config.api.API_BASE_URL,
    accessToken: () => localStorage.getItem('jwt') ?? ''
});

export const tasksApi = new TasksApi(apiCfg);
export const formsApi = new FormsApi(apiCfg);
export const mediaApi = new MediaApi(apiCfg);

export default {
    tasksApi,
    formsApi,
    mediaApi
}
