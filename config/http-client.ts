import axios from 'axios';

export const BASE_URL = process.env.BASE_URL || '';

export default axios.create({ baseURL: BASE_URL });
