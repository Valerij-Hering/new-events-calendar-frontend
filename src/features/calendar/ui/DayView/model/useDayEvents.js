export function useDayEvents(events, selectedDate) {

  const isSameWeekday = (dateStr) => {
    const d1 = new Date(dateStr);
    const d2 = new Date(selectedDate);
    return d1.getDay() === d2.getDay();
  };

  const allDayEvents = events.filter(
    e => e.allDay && e.start === selectedDate
  );

  const timedEvents = events.filter(e => {
    if (e.allDay) return false;

    if (e.repeatWeekly) {
      return isSameWeekday(e.start);
    }

    return e.start.startsWith(selectedDate);
  });

  return { allDayEvents, timedEvents };
}
