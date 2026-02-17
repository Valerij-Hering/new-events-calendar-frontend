import { useTranslation } from "react-i18next"
import { CalendarGrid } from "../../features/calendar/ui/CalendarGrid/CalendarGrid"
import { DayView } from "../../features/calendar/ui/DayView/ui/DayView"
import { WeekView } from "../../features/calendar/ui/WeekView/ui/WeekView"
import { YearCalendar } from "../../features/calendar/ui/YearCalendar/YearCalendar"
import { Stack } from "../../shared/ui/Stack/Stack"
import styles from "./CalendarViews.module.scss"
import { Text } from "@/shared/ui/Text/Text";
import { CalendarViewSwitcher } from "@/features/calendar/ui/calendarViewSwitcher/calendarViewSwitcher"

export const CalendarViews = (
    {viewMode,
    setViewMode,
    currentDate,
    selectedDate,
    events,
    eventsByDate,
    selectedHoliday,
    handleSelectDate,
    prevMonth,
    nextMonth,
    setSelectedDate}
) => {

    const { t } = useTranslation("common");

    return (
        <Stack className={styles.calendarViews} direction="column" fullWidth>
            <Stack className={styles.containerCalendarViewSwitcher}>
                <CalendarViewSwitcher
                    viewMode={viewMode}
                    onChange={setViewMode}
                />
            </Stack>
            <Stack fullWidth>
                {viewMode === "month" &&(
                <CalendarGrid
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    eventsByDate={eventsByDate}
                    selectedHoliday={selectedHoliday} 
                    onSelectDate={handleSelectDate}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    variant={viewMode}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
                )}
                {viewMode === "year" && (
                <YearCalendar
                    year={currentDate.getFullYear()}
                    eventsByDate={eventsByDate}
                    onSelectDate={handleSelectDate}
                    selectedDate={selectedDate}
                    variant={viewMode}
                />
                )}
                {viewMode === "day" && selectedDate && (
                <DayView
                    events={events}
                    selectedDate={selectedDate}
                    onChangeDate={setSelectedDate}
                />
                
                )}
                {viewMode === "week" && selectedDate && (
                <WeekView
                    events={events}
                    selectedDate={selectedDate}
                    onChangeDate={setSelectedDate}/>
                )}
            </Stack>
        </Stack>
    )
}