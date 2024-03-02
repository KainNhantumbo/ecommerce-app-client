import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
export default axios.create({ baseURL: BASE_URL });
