import { useEffect, useState } from "react";
import { Stack } from "../../../../shared/ui/Stack/Stack";
import { useCalendar } from "../../model/useCalendar";
import { CalendarGrid } from "../CalendarGrid/CalendarGrid";
import { EventList } from "../EventList/EventList";
import { mapEvents } from "../../model/mapEvents";
import styles from "./Calendar.module.scss"
import { AddEventButton } from "../AddEvent/AddEvent";
import { useTranslation } from "react-i18next";
import { useEditEvent } from "../../../events/model/useEditEvent";
import { CreateEventForm } from "../../../createEvent/CreateEventForm"
import { useResize } from "../../../../shared/hooks/useResize";
import { YearCalendar } from "../YearCalendar/YearCalendar";
import { Button } from "../../../../shared/ui/Button/Button";
import { getStyles } from "../../../../shared/lib/getStyles";
import { CurrentDateTime } from "../../../../widgets/currentDateTime/ui/CurrentDateTime";
import { useCalendarGrid } from "../../model/useCalendarGrid";
import { Text } from "@/shared/ui/Text/Text"
import { formatEventHolidayLabel } from "../../model/formatEventHolidayLabel";
import { DayView } from "../DayView/ui/DayView";
import { WeekView } from "../WeekView/ui/WeekView";
import { CalendarViews } from "../../../../widgets/CalendarViews/CalendarViews";




export const Calendar = ({ events, isLoading, isError, }) => {
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    handleSelectDate,
    selectedHoliday,        
    prevMonth,
    nextMonth,
  } = useCalendar();

  const { editEvent, setEditEvent, handleEdit } = useEditEvent();
  const [now, setNow] = useState(() => new Date());
  const { t, i18n } = useTranslation("common");
  const { isMobile, isTablet } = useResize();
  const [viewMode, setViewMode] = useState("month");
  const lang = i18n.language || "en";

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const eventsByDate = mapEvents(events, now, t);

  const selectedEvents = selectedDate
    ? eventsByDate[selectedDate] || []
    : [];

    const allEvents = Object.values(eventsByDate).flat();
    const { year, month, todayStr, days, emptyCells } = useCalendarGrid({
            currentDate,
            eventsByDate,
            locale: lang,
        });
    const todayHoliday = days.find(d => d.dateStr === todayStr)?.holiday ?? null;



  return (
    <Stack className={styles.containerColendar} direction={isTablet || isMobile ? "column" : "row"} justify='between' align={isMobile ? 'center' : ''} fullWidth>
      <Stack className={getStyles(styles.containerColendarYearMonth,{[styles.year]: viewMode === "year"},[])} direction="column" align="center" fullWidth gap="48">
        <CalendarViews
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentDate={currentDate}
          selectedDate={selectedDate}
          events={events}
          eventsByDate={eventsByDate}
          selectedHoliday={selectedHoliday}
          handleSelectDate={handleSelectDate}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          setSelectedDate={setSelectedDate}
          
        />
        <Stack direction="column" align="center" gap="16">
          {todayHoliday && (
            <Stack align="center" gap="8" className={styles.todayHolidayBanner}>
              <Text tag="span" className={styles.holidayDot} />
              <Text color="text-primary" fontStyle="poppins400">
                {t("eventItem.remaining.today")} – {todayHoliday.name}
                {todayHoliday.isOffDay ? " (Выходной)" : ""}
              </Text>
            </Stack>
          )}
          {selectedHoliday && selectedDate && selectedDate !== todayStr && (
            <Stack align='center' gap='8'>
              <Text tag='span' className={styles.holidayDot}/>
              <Text className={styles.holidayLabel} color="text-primary">
                {formatEventHolidayLabel(selectedDate, selectedHoliday, lang, false, t)}
              </Text>
            </Stack>
          )}
          <CurrentDateTime/>
        </Stack>
      </Stack>
      <EventList 
        selectedDate={selectedDate} 
        events={selectedEvents} 
        allEvents={allEvents}
        onClearSelectedDate={() => setSelectedDate(null)}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleEdit}
        variant={viewMode}
      />
      <AddEventButton/>
      {editEvent && (
        <CreateEventForm
          initialData={editEvent}
          onClose={() => setEditEvent(null)}
        />
      )}
      
    </Stack>
  );
};
