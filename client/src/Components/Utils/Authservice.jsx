import axios from "axios";

const BASE_URL = 'http://localhost:5000/api';

export const Adminlogin = (data) => axios.post(`${BASE_URL}/login`,data);