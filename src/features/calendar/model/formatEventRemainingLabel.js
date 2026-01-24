// shared/lib/formatEventRemainingLabel.ts
export const formatEventRemainingLabel = (eventDate, now = new Date()) => {
    const start = normalize(eventDate);
    const today = normalize(now);

    const diffDays = Math.floor((start - today) / 86400000);

    if (diffDays < 0) return null;
    if (diffDays === 0) {
        return { key: "eventItem.remaining.today" };
    }

    // years
    const years = Math.floor(diffDays / 365);
    if (years > 2) return null;
    if (years >= 1) {
        return {
        key: "eventItem.remaining.years",
        count: years,
        };
    }

    // months
    const months = Math.floor(diffDays / 30);
    if (months >= 1) {
        return {
        key: "eventItem.remaining.months",
        count: months,
        };
    }

    // weeks
    const weeks = Math.floor(diffDays / 7);
    if (weeks >= 1) {
        return {
        key: "eventItem.remaining.weeks",
        count: weeks,
        };
    }

    // days
    return {
        key: "eventItem.remaining.days",
        count: diffDays,
    };
    };

    const normalize = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
