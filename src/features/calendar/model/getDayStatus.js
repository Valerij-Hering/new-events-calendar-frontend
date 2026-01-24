export const getDayStatus = (events = []) => {
  if (!events.length) return "none";

  const allPast = events.every(e => e.isPast);
  if (allPast) return "past";

  return "active";
};
