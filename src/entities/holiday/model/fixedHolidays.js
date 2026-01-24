// entities/holiday/model/fixedHolidays.js
export const fixedHolidays = {
    en: [
        { month: 0, day: 1, name: "New Year", isOffDay: true },
        { month: 1, day: 14, name: "Valentine’s Day", isOffDay: false },
        { month: 2, day: 8, name: "International Women’s Day", isOffDay: false },
        { month: 2, day: 17, name: "St. Patrick’s Day", isOffDay: false },
        { month: 3, day: 1, name: "April Fools’ Day", isOffDay: false },
        { month: 4, day: 4, name: "Star Wars Day (May the 4th)", isOffDay: false },
        { month: 5, day: 1, name: "Children’s Day", isOffDay: false },
        { month: 6, day: 4, name: "US Independence Day", isOffDay: false },
        { month: 9, day: 31, name: "Halloween", isOffDay: false },
        { month: 10, day: 11, name: "Veterans Day", isOffDay: false },
        { month: 10, day: 24, name: "Black Friday", isOffDay: false }, // Не фиксированный, но часто отображается
        { month: 11, day: 24, name: "Christmas Eve", isOffDay: false },
        { month: 11, day: 25, name: "Christmas", isOffDay: false },
        { month: 11, day: 31, name: "New Year’s Eve", isOffDay: false }
    ],

    ru: [
        { month: 0, day: 1, name: "Новый год", isOffDay: true },
        { month: 0, day: 7, name: "Рождество", isOffDay: true },
        { month: 0, day: 14, name: "Старый Новый год", isOffDay: false },
        { month: 0, day: 19, name: "Крещение", isOffDay: false },
        { month: 1, day: 14, name: "День Святого Валентина", isOffDay: false },
        { month: 1, day: 23, name: "День защитника Отечества", isOffDay: true },
        { month: 2, day: 8, name: "Международный женский день", isOffDay: true },
        { month: 3, day: 12, name: "День космонавтики", isOffDay: false },
        { month: 4, day: 1, name: "Праздник Весны и Труда", isOffDay: true },
        { month: 4, day: 9, name: "День Победы", isOffDay: true },
        { month: 5, day: 1, name: "День защиты детей", isOffDay: false },
        { month: 5, day: 12, name: "День России", isOffDay: true },
        { month: 6, day: 28, name: "День Крещения Руси", isOffDay: false },
        { month: 7, day: 22, name: "День государственного флага РФ", isOffDay: false },
        { month: 8, day: 1, name: "День знаний", isOffDay: false },
        { month: 10, day: 4, name: "День народного единства", isOffDay: true },
        { month: 11, day: 31, name: "Канун Нового года", isOffDay: true }
    ],

    de: [
        { month: 0, day: 1, name: "Neujahr", isOffDay: true },
        { month: 4, day: 1, name: "Tag der Arbeit", isOffDay: true },
        { month: 9, day: 3, name: "Tag der Deutschen Einheit", isOffDay: true },
        { month: 9, day: 31, name: "Halloween", isOffDay: false },
        { month: 11, day: 24, name: "Heiligabend", isOffDay: false },
        { month: 11, day: 25, name: "Weihnachten", isOffDay: false },
        { month: 11, day: 26, name: "Zweiter Weihnachtstag", isOffDay: false },
        { month: 11, day: 31, name: "Silvester", isOffDay: false },

        // Региональные (земли, фиксированные даты)
        { month: 0, day: 6, name: "Heilige Drei Könige", isOffDay: false },
        { month: 7, day: 15, name: "Mariä Himmelfahrt", isOffDay: false },
        { month: 9, day: 31, name: "Reformationstag", isOffDay: false },
        { month: 10, day: 1, name: "Allerheiligen", isOffDay: false }
    ]
    };

    export const getHolidaysByLocale = (locale = "en", year = new Date().getFullYear()) => {
    return (fixedHolidays[locale] || []).map(h => ({
        date: `${year}-${String(h.month + 1).padStart(2, "0")}-${String(h.day).padStart(2, "0")}`,
        name: h.name, 
    }));
};
