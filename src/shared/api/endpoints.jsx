export const endpoints = {
  path: {
    /** Auth */
    registration: "/registration",
    login: "/login",
    logout: "/logout",
    reset_password: "/reset-password",
    change_password: "/change-password",
    user: "/user",
    updateUser: "/update-user",
    updateUserAvatar: "/update-avatar",
    resend_activation: '/resend-activation',

    /** Events */
    create_event: "/events",
    my_events: "/events/my",
    update_event: "/events", // PUT /events/:id
    delete_event: "/events", // DELETE /events/:id
  },
};