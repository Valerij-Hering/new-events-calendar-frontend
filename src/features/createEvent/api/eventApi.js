import { endpoints } from "../../../shared/api/endpoints";
import { api } from "../../../shared/api/api";

const config = {
    production: 'https://new-events-calendar-backend.onrender.com',
    develop: "http://localhost:8000",
};

export const apiUrl = config.production;

export const eventApi = api.injectEndpoints({
    endpoints: (builder) => ({
        /** Создание события */
        createEvent: builder.mutation({
        query: (eventData) => ({
            method: "POST",
            url: endpoints.path.create_event, // должен быть прописан у тебя в endpoints
            body: eventData,
        }),
        invalidatesTags: ["MyEvents"],
        }),

        /** Получение только своих событий */
        getMyEvents: builder.query({
        query: () => ({
            method: "GET",
            url: endpoints.path.my_events, // например: "/events/my"
        }),
        providesTags: ["MyEvents"],
        }),

        /** Обновление события */
        updateEvent: builder.mutation({
        query: ({ id, ...patch }) => ({
            method: "PUT",
            url: `${endpoints.path.update_event}/${id}`, // например "/events/update/:id"
            body: patch,
        }),
        invalidatesTags: ["MyEvents"],
        }),

        /** Удаление события */
        deleteEvent: builder.mutation({
        query: (id) => ({
            method: "DELETE",
            url: `${endpoints.path.delete_event}/${id}`, // например "/events/delete/:id"
        }),
        invalidatesTags: ["MyEvents"],
        }),
    }),
});

export const {
    useCreateEventMutation,
    useGetMyEventsQuery,
    useUpdateEventMutation,
    useDeleteEventMutation,
} = eventApi;
