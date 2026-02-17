export const HOUR_HEIGHT = 60;
export const MIN_EVENT_HEIGHT = 40;

export function getEventPosition(event) {
  if (event.allDay) return null;

  const timePart = event.start.split("T")[1];
  if (!timePart) return null;

  const [hours, minutes] = timePart.split(":").map(Number);

  const top =
    hours * HOUR_HEIGHT +
    (minutes / 60) * HOUR_HEIGHT;

  // если нет end → фиксированная высота
  if (!event.end) {
    return {
      top,
      height: MIN_EVENT_HEIGHT,
    };
  }

  const endTime = event.end.split("T")[1];
  const [endH, endM] = endTime.split(":").map(Number);

  const duration =
    (endH * 60 + endM) -
    (hours * 60 + minutes);

  const height =
    (duration / 60) * HOUR_HEIGHT;

  return {
    top,
    height: Math.max(height, MIN_EVENT_HEIGHT),
  };
}

