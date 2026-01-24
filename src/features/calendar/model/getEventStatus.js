export const getEventStatus = ({ start, end, isAllDay }, now = new Date()) => {
  // Парсим start и end локально, не UTC
  const parseDateTime = (dateStr) => {
    if (!dateStr) return null;
    const [dayPart, timePart] = dateStr.split("T");
    const [year, month, day] = dayPart.split("-").map(Number);

    if (timePart) {
      const [hours, minutes] = timePart.split(":").map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    }

    return new Date(year, month - 1, day);
  };

  const startDate = parseDateTime(start);
  const endDate = parseDateTime(end);

  const nowLocal = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes()
  );

  if (endDate) {
    return endDate < nowLocal ? "past" : "active";
  }

  if (isAllDay) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return startDate < today ? "past" : "active";
  }

  return startDate < nowLocal ? "past" : "active";
};
