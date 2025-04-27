import {
    Configuration,           // replaces ApiClient
    TasksApi,
    FormsApi,
    MediaApi,
} from '@/api-content'; // generated from openapi spec

import config from '../configs/api-content.json';

const apiCfg = new Configuration({
    basePath: config.api.API_BASE_URL,  
    // accessToken: () => localStorage.getItem('jwt') ?? '',
    // or to override fetch (node, SSR):
    // fetchApi : fetchPolyfill,
});

export const tasksApi  = new TasksApi(apiCfg);
export const formsApi  = new FormsApi(apiCfg);
export const mediaApi  = new MediaApi(apiCfg);

export default {
    tasksApi,
    formsApi,
    mediaApi
}


// export const apiContent = {
//   tasks : tasksApi,
//   forms : formsApi,
//   media : mediaApi,
// };

// export default apiContent;
