export function groupEventsByHour(events, selectedDate) {
  const hoursMap = {};

  for (let i = 0; i < 24; i++) {
    hoursMap[i] = [];
  }

  events.forEach(event => {
    if (event.allDay) return;

    if (!event.start.startsWith(selectedDate)) return;

    const timePart = event.start.split("T")[1];
    if (!timePart) return;

    const [hours, minutes] = timePart.split(":").map(Number);

    hoursMap[hours].push({
      ...event,
      minutes,
    });
  });

  // сортировка внутри часа
  Object.keys(hoursMap).forEach(hour => {
    hoursMap[hour].sort((a, b) => a.minutes - b.minutes);
  });

  return hoursMap;
}
