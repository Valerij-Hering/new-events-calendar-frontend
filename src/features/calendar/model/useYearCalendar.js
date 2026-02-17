import { useState } from "react";

export const useYearCalendar = (initialYear = new Date().getFullYear()) => {
    const [year, setYear] = useState(initialYear);

    const prevYear = () => setYear(y => y - 1);
    const nextYear = () => setYear(y => y + 1);

    return { year, prevYear, nextYear, setYear };
};
