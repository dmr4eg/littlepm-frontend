import DefaultApi from './controllers/DefaultApi';
import ApiClient from './ApiClient';

// TODO use configs json
const api = new DefaultApi(new ApiClient(config.url.API_BASE_URL));

export default api; 