import ContentApi from './controllers/ContentApi';
import ApiClient from './ApiClient';

import config from '../configs/api-content.json';

// TODO use configs json
const apiContent = new ContentApi(new ApiClient(config.api.API_BASE_URL));

export default apiContent;

