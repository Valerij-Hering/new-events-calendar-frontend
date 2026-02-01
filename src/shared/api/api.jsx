import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const config = {
    production: 'https://new-events-calendar-backend.onrender.com',
    develop: 'http://localhost:8000', 
}
export const apiUrl = config.production;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        credentials: 'include',
        prepareHeaders: (headers) => {
        const token = Cookies.get('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
        },
    }),
    endpoints: () => ({})
})