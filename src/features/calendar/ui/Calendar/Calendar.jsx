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
  const { t } = useTranslation("common");
  const { isMobile, isTablet } = useResize();

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



  return (
    <Stack className={styles.containerColendar} direction={isTablet || isMobile ? "column" : "row"} justify='between' align={isMobile ? 'center' : ''} fullWidth>
      <CalendarGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        eventsByDate={eventsByDate}
        selectedHoliday={selectedHoliday} 
        onSelectDate={handleSelectDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <EventList 
        selectedDate={selectedDate} 
        events={selectedEvents} 
        allEvents={allEvents}
        onClearSelectedDate={() => setSelectedDate(null)}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleEdit}
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
