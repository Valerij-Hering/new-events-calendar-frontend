export const formatEventTime = ({ isAllDay, start, end }, t) => {
  if (isAllDay) return t("eventItem.All Day");

  const pad = (n) => String(n).padStart(2, "0");

  const startStr = `${pad(start.getHours())}:${pad(start.getMinutes())}`;
  const endStr = end ? `${pad(end.getHours())}:${pad(end.getMinutes())}` : null;

  return endStr ? `${startStr} - ${endStr}` : startStr;
};
