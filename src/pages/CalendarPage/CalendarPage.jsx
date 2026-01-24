import { Stack } from "../../shared/ui/Stack/Stack"
import { CalendarSection } from "../../widgets/CaledarSection/CalendarSection"
import styles from "./CalendarPage.module.scss"


export const CalendarPage = () => {
    return (
            <Stack className={styles.calendarPage} fullWidth>
                <CalendarSection/>
            </Stack>
    )
}