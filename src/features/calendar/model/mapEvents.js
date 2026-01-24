import { formatEventRemainingLabel } from "./formatEventRemainingLabel";
import { formatEventTime } from "./formatEventTime";

export const mapEvents = (events, now, t) => {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // локальная сегодня

  return events.reduce((acc, event) => {
    if (!event?.start || typeof event.start !== "string") return acc;

    const isAllDay = !event.start.includes("T") || event.allDay;

    const [dayPart, timePart] = event.start.split("T");
    const [year, month, day] = dayPart.split("-").map(Number);

    // создаём локальную дату вручную, без UTC
    const start = isAllDay
      ? new Date(year, month - 1, day)
      : (() => {
          const [hours, minutes] = (timePart || "00:00").split(":").map(Number);
          return new Date(year, month - 1, day, hours, minutes);
        })();

    if (isNaN(start.getTime())) return acc;

    let end = null;
    if (event.end) {
      const [endDay, endTime] = event.end.split("T");
      const [eyear, emonth, eday] = endDay.split("-").map(Number);
      if (!endTime) {
        end = new Date(eyear, emonth - 1, eday);
      } else {
        const [eh, emin] = endTime.split(":").map(Number);
        end = new Date(eyear, emonth - 1, eday, eh, emin);
      }
    }

    const dateStr = dayPart; // ключ для группировки по дате
    const eventDay = new Date(year, month - 1, day);

    const isToday = eventDay.getTime() === today.getTime();
    const isPast = end
      ? end < now
      : isAllDay
        ? eventDay < today
        : start < now;

    acc[dateStr] ??= [];
    acc[dateStr].push({
      ...event,
      start,
      end,
      isAllDay,
      isPast,
      isToday,
      remainingLabel: isPast
        ? { key: "eventItem.remaining.passed" }
        : isToday
          ? { key: "eventItem.remaining.today" }
          : formatEventRemainingLabel(eventDay, today),
      timeLabel: formatEventTime({ isAllDay, start, end }, t),
    });

    return acc;
  }, {});
};
