import {Stack} from "./shared/ui/Stack/Stack"
import './App.css'
import {  CalendarPage } from "./pages/CalendarPage/CalendarPage"
import { RouterProvider } from "react-router-dom"
import { router } from "./app/providers/router/router";
import { ModalProvider } from "@/app/providers/ModalProvider/ModalProvider";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();


function App() {

  return (
    <ModalProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer
            position="top-right"
            theme="light"
            autoClose={3000}
            closeOnClick
            pauseOnHover
            draggable
          />
      <RouterProvider router={router}>
        <Stack>
          <CalendarPage/>
        </Stack>
      </RouterProvider>
      </LocalizationProvider>
    </ModalProvider>
  )
}

export default App
