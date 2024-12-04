import axios from "axios";

const BASE_URL = 'https://your-api.com';

export const Adminlogin = (data) => axios.post(`${BASE_URL}/admin/login`,data);