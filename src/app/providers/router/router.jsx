import { createBrowserRouter } from "react-router-dom";

import { CalendarPage } from "../../../pages/CalendarPage/CalendarPage";
import { LoginForm } from "../../../features/auth/LoginForm/LoginForm";
import { RegistrationForm } from "../../../features/auth/RegistrationForm/RegistrationForm";
import { ResetPasswordForm } from "../../../features/auth/ResetPasswordForm/ResetPasswordForm";
import { ChangePasswordForm } from "../../../features/auth/ChangePasswordForm/ChangePasswordForm";
import { CreateEventForm } from "../../../features/createEvent/CreateEventForm";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <CalendarPage/>,
    },
    {
        path: "/login",
        element: <LoginForm/>,
    },
    {
        path: "/registration",
        element: <RegistrationForm/>,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordForm/>,
    },
    {
        path: "/change-password/:resetToken",
        element: <ChangePasswordForm/>,
    },
    {
        path: "/create-event",
        element: <CreateEventForm/>,
    }
]);
