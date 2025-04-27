import CourseApi from '../api-course/controllers/CourseApi';
import ApiClient from '../api-course/ApiClient';

// relative path from here to your config.json
import config from '../configs/api-course.json';

// TODO use configs json
const apiCourse = new CourseApi(new ApiClient(config.api.API_BASE_URL));

export default apiCourse;