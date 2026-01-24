

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://new-events-calendar-backend.onrender.com', //'http://localhost:8000'
    credentials: 'include', // важно для cookie
    prepareHeaders: (headers) => {
      // берём токен из cookie
      const token = document.cookie
        .split('; ')
        .find(c => c.startsWith('token='))
        ?.split('=')[1];
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['MyEvents'],
  endpoints: () => ({}),
});
