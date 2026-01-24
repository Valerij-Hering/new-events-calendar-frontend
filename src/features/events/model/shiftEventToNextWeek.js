export const shiftEventToNextWeek = (event, now = new Date()) => {
  if (!event?.start) throw new Error("Event has no start");

  // Нормализуем start/end в Date для расчётов
  const startDate = event.start instanceof Date ? event.start : new Date(event.start);
  const endDate = event.end ? (event.end instanceof Date ? event.end : new Date(event.end)) : null;

  const eventDow = startDate.getDay(); // 0–6 день недели
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Определяем прошлое событие
  const isPast = event.allDay ? startDate < today : startDate < now;

  let shiftedStart;

  if (!isPast) {
    // Будущее событие → просто +7 дней
    shiftedStart = new Date(startDate);
    shiftedStart.setDate(shiftedStart.getDate() + 7);
  } else {
    // Прошлое событие → ищем ближайший такой же день недели в будущем
    shiftedStart = new Date(today);
    const daysUntilTarget = (7 + eventDow - shiftedStart.getDay()) % 7;
    shiftedStart.setDate(shiftedStart.getDate() + daysUntilTarget);

    if (!event.allDay && typeof event.start === "string" && event.start.includes("T")) {
      const timePart = event.start.split("T")[1] ?? "00:00";
      const [h, m] = timePart.split(":");
      shiftedStart.setHours(+h, +m, 0, 0);
    } else if (!event.allDay && startDate instanceof Date) {
      shiftedStart.setHours(startDate.getHours(), startDate.getMinutes(), 0, 0);
    }

    // Если рассчитанная дата всё ещё в прошлом → +7 дней
    if (shiftedStart < now) {
      shiftedStart.setDate(shiftedStart.getDate() + 7);
    }
  }

  // Сохраняем длительность и переносим end
  let shiftedEnd = null;
  if (endDate) {
    const durationMs = endDate.getTime() - startDate.getTime();
    shiftedEnd = new Date(shiftedStart.getTime() + durationMs);
  }

  // Формат для backend
  const formatDate = (d, withTime = true) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    if (!withTime) return `${y}-${m}-${day}`;

    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${day}T${h}:${min}`;
  };

  return {
    id: event._id,
    start: event.allDay ? formatDate(shiftedStart, false) : formatDate(shiftedStart),
    ...(shiftedEnd && { end: formatDate(shiftedEnd) }),
  };
};
