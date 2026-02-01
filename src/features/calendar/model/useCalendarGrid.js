import { useMemo } from "react";
import { getDayStatus } from "./getDayStatus";
import { getHolidaysByLocale } from "@/entities/holiday/model/fixedHolidays";

export const useCalendarGrid = ({ currentDate, eventsByDate, locale }) => {
  return useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // ✅ Локальная текущая дата без смещения UTC
    const today = new Date();
    const todayStr =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    // Получаем праздники для текущего года
    const holidays = getHolidaysByLocale(locale, year);
    const holidayMap = Object.fromEntries(holidays.map(h => [h.date, h]));

    // Первый и последний день месяца
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Понедельник = 0
    const startWeekDay = (firstDay.getDay() + 6) % 7;

    const emptyCells = Array(startWeekDay).fill(null);
    const days = [];

    let weekIndex = 0; // отслеживаем текущую неделю

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);

      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Если день понедельник и не первый день месяца, увеличиваем weekIndex
      if ((date.getDay() + 6) % 7 === 0 && i !== 1) {
        weekIndex++;
      }

      const dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(i).padStart(2, "0");
      const events = eventsByDate[dateStr] || [];

      days.push({
        day: i,
        dateStr,
        events,
        eventCount: events.length,
        status: getDayStatus(events),
        isHoliday: Boolean(holidayMap[dateStr]),
        holiday: holidayMap[dateStr] ?? null,
        weekIndex, // 🔹 добавляем индекс недели
        isWeekend
      });
    }

    return { year, month, todayStr, days, emptyCells };
  }, [currentDate, eventsByDate, locale]);
};
