import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '@/features/auth/api/userApi';
import { eventApi } from '../../features/createEvent/api/eventApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), 
});
