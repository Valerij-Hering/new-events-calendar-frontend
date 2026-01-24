export const formatEventDayLabel = (
    date,
    locale = "en"
    ) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return "";

    const weekday = date.toLocaleDateString(locale, {
        weekday: "long",
    });

    const dayMonth = date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "short",
    });

    return `${weekday} – ${dayMonth}`;
};
