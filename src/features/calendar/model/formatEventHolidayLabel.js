export const formatEventHolidayLabel = (dateStr, holiday, locale, isToday, t) => {
  if (!holiday) return '';

  // Парсим локально без UTC
  const [year, month, day] = dateStr.split('-').map(Number);

  const monthName = new Date(year, month - 1, day).toLocaleString(locale, { month: 'long' });

  return `${isToday ? t('eventItem.remaining.today') : `${day} ${monthName}`} - ${holiday.name}`;
};
