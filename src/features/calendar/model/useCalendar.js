// features/calendar/model/useCalendar.js
import { useState } from "react";

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHoliday, setSelectedHoliday] = useState(null); 


    // функция для перехода на предыдущий месяц
    const prevMonth = () => {
        const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(prev);
    };

    // функция для перехода на следующий месяц
    const nextMonth = () => {
        const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(next);
    };

    const handleSelectDate = (dateStr, holiday) => {
        setSelectedDate(dateStr);
        setSelectedHoliday(holiday);
    };

    return {
        currentDate,
        selectedDate,
        setSelectedDate,
        setCurrentDate,
        handleSelectDate,
        selectedHoliday,
        prevMonth,
        nextMonth,
    };
};
