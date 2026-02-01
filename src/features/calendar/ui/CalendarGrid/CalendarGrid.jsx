import { CalendarCell } from "../CalendarCell/CalendarCell";
import { Stack } from "@/shared/ui/Stack/Stack";
import styles from "./CalendarGrid.module.scss";
import { Text } from "@/shared/ui/Text/Text";
import { ArrowIcon } from "@/assets/svg/ArrowIcon";
import { Button } from "@/shared/ui/Button/Button";
import { useCalendarGrid } from "../../model/useCalendarGrid";
import { useTranslation } from "react-i18next";
import { formatEventHolidayLabel } from "../../model/formatEventHolidayLabel";
import { CurrentDateTime } from "../../../../widgets/currentDateTime/ui/CurrentDateTime";


export const CalendarGrid = ({
    currentDate,
    selectedDate,
    eventsByDate,
    onSelectDate,
    prevMonth,
    nextMonth,
    selectedHoliday, // выбранный праздник
    }) => {
    const { i18n, t } = useTranslation("common");
    const lang = i18n.language || "en";

    const monthNames = {
        en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        ru: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
        de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    };

    const daysOfWeek = {
        en: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
        ru: ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
        de: ["Mo","Di","Mi","Do","Fr","Sa","So"],
    };

    const { year, month, todayStr, days, emptyCells } = useCalendarGrid({
        currentDate,
        eventsByDate,
        locale: lang,
    });

    const handleSelectDate = (dateStr) => {
        const holiday = days.find(d => d.dateStr === dateStr)?.holiday ?? null;
        onSelectDate(dateStr, holiday);
    };

    // праздник сегодняшнего дня
    const todayHoliday = days.find(d => d.dateStr === todayStr)?.holiday ?? null;


    return (
        <Stack className={styles.containerCalendarGrid} direction="column" align="center" gap="24" fullWidth>

        {/* HEADER */}
        <Stack fullWidth>
            <Stack align="center" justify="between" fullWidth>
                <Stack className={styles.containerHeader} align="center" justify="between" fullWidth>
                    <Button onClick={prevMonth} variant="clear" noPadding>
                        <ArrowIcon rotate="left" size="25" />
                    </Button>
                    <Text className={styles.monthYears} color="text-primary" size="14" fontStyle="poppins500">
                        {monthNames[lang][month]} 
                    </Text>
                    <Button onClick={nextMonth} variant="clear" noPadding>
                        <ArrowIcon rotate="right" size="25" />
                    </Button>
                </Stack>
                <Text color="text-primary" fontStyle="poppins500">{year}</Text>
            </Stack>
        </Stack>

        {/* GRID */}
        <Stack className={styles.containerCells} gap="24" fullWidth>
            {daysOfWeek[lang].map(d => <Text key={d} fontStyle="poppins500">{d}</Text>)}
            {emptyCells.map((_, i) => <Stack key={`empty-${i}`} />)}
            {days.map(d => (
            <CalendarCell
                key={d.dateStr}
                day={d.day}
                eventCount={d.eventCount}
                status={d.status}
                isToday={d.dateStr === todayStr}
                isSelected={selectedDate === d.dateStr}
                isPastDate={d.dateStr < todayStr}
                isHoliday={d.isHoliday}
                isWeekend={d.isWeekend}
                onClick={() => handleSelectDate(d.dateStr)}
            />
            ))}
        </Stack>
        {/* Постоянный лейбл праздника сегодняшнего дня */}
        {todayHoliday && (
        <Stack align="center" gap="8" className={styles.todayHolidayBanner}>
            <Text tag="span" className={styles.holidayDot} />
            <Text color="text-primary" fontStyle="poppins400">
            {t("eventItem.remaining.today")} – {todayHoliday.name}
            {todayHoliday.isOffDay ? " (Выходной)" : ""}
            </Text>
        </Stack>
        )}
        {/* HOLIDAY LABEL */}
        {selectedHoliday && selectedDate && selectedDate !== todayStr && (
        <Stack align='center' gap='8'>
            <Text tag='span' className={styles.holidayDot}/>
            <Text className={styles.holidayLabel} color="text-primary">
            {formatEventHolidayLabel(selectedDate, selectedHoliday, lang, false, t)}
            </Text>
        </Stack>
        )}
        <CurrentDateTime/>
        </Stack>
    );
};
