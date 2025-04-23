import DefaultApi from './controllers/DefaultApi';
import ApiClient from './ApiClient';

// Create a singleton instance
const api = new DefaultApi(ApiClient.instance);

export default api; 