export const groupEventsByDate = (events) => {
    return events.reduce((acc, event) => {
        const start = event.start;

        // используем локальные год, месяц, день
        const dateStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2,'0')}-${String(start.getDate()).padStart(2,'0')}`;

        acc[dateStr] ??= [];
        acc[dateStr].push(event);
        return acc;
    }, {});
};
