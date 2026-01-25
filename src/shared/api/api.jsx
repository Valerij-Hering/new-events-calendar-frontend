import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const config = {
    production: '',
    develop: 'https://new-events-calendar-backend.onrender.com', //'http://localhost:8000'
}
export const apiUrl = config.develop

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