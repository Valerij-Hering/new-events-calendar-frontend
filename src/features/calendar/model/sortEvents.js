export const sortEvents = (events) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const active = [];
  const past = [];

  events.forEach(e => {
    const dateOnly = new Date(e.start.getFullYear(), e.start.getMonth(), e.start.getDate());
    if (dateOnly >= today) {
      active.push(e);
    } else {
      past.push(e);
    }
  });

  const sortByTimeWithinDay = (a, b) => {
    // обычные события раньше, all-day в конце
    if (a.isAllDay && !b.isAllDay) return 1;
    if (!a.isAllDay && b.isAllDay) return -1;
    return a.start.getTime() - b.start.getTime();
  };

  const sortByDateThenTimeAsc = (a, b) => {
    // сортировка по дате по возрастанию
    const dateA = new Date(a.start.getFullYear(), a.start.getMonth(), a.start.getDate()).getTime();
    const dateB = new Date(b.start.getFullYear(), b.start.getMonth(), b.start.getDate()).getTime();
    if (dateA !== dateB) return dateA - dateB;
    return sortByTimeWithinDay(a, b);
  };

  const sortByDateThenTimeDesc = (a, b) => {
    // сортировка по дате по убыванию для прошедших
    const dateA = new Date(a.start.getFullYear(), a.start.getMonth(), a.start.getDate()).getTime();
    const dateB = new Date(b.start.getFullYear(), b.start.getMonth(), b.start.getDate()).getTime();
    if (dateA !== dateB) return dateB - dateA;
    // внутри одной даты: обычные события раньше, all-day в конце
    return sortByTimeWithinDay(a, b);
  };

  active.sort(sortByDateThenTimeAsc);
  past.sort(sortByDateThenTimeDesc);

  return [...active, ...past];
};
