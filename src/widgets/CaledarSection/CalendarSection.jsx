import { Calendar } from "@/features/calendar/ui/Calendar/Calendar";
import { DesktopNavbar } from "@/widgets/Navbar/DesktopNavbar/ui/DesktopNavbar";
import { Stack } from "@/shared/ui/Stack/Stack";
import { useGetMyEventsQuery } from "@/features/createEvent/api/eventApi";
import styles from "./CalendarSection.module.scss";
import { Loader } from "../../shared/ui/Loader/Loader";
import { useAuth } from "../../features/auth/contexts/AuthContext"

export const CalendarSection = () => {

  const { isAuthenticated } = useAuth();

  const {
  data: events = [],
  isLoading,
  isError
} = useGetMyEventsQuery(undefined, {
  pollingInterval: 300_000,
  skip: !isAuthenticated, // 🔥 КЛЮЧЕВО
});

  return (
    <Stack className={styles.calendarSection} direction="column" align='center' gap="24" fullWidth>
      {isLoading && 
        <Stack className={styles.overlayLoader} justify="center" align="center" fullWidth>
          <Loader/>
        </Stack>
      }
      <DesktopNavbar />
      <Calendar events={events} isLoading={isLoading} isError={isError} />
    </Stack>
  );
};
