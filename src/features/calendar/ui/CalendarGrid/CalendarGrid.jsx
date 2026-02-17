import { CalendarCell } from "../CalendarCell/CalendarCell";
import { Stack } from "@/shared/ui/Stack/Stack";
import styles from "./CalendarGrid.module.scss";
import { Text } from "@/shared/ui/Text/Text";
import { ArrowIcon } from "@/assets/svg/ArrowIcon";
import { Button } from "@/shared/ui/Button/Button";
import { useCalendarGrid } from "../../model/useCalendarGrid";
import { useTranslation } from "react-i18next";
import { getStyles } from "@/shared/lib/getStyles";



export const CalendarGrid = ({
    currentDate,
    selectedDate,
    eventsByDate,
    onSelectDate,
    prevMonth,
    nextMonth,
    variant = "month",
    }) => {
    const { i18n, t } = useTranslation("common");
    const lang = i18n.language || "en";

    const monthNames = {
        en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        ru: ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],
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


    return (
        <Stack className={getStyles(styles.containerCalendarGrid,{[styles.year]: variant === "year"},[])} direction="column" align="center" gap={variant === "year" ? "0" : "24"}  {...(variant === "month" ? { fullWidth: true } : {})}>

        {/* HEADER */}
        <Stack fullWidth>
            <Stack align="center" justify="between" fullWidth>
                <Stack  align="center" gap="8">
                    { variant === "month" &&(
                    <Button onClick={prevMonth} variant="clear" noPadding>
                        <ArrowIcon rotate="left" size="25" />
                    </Button>
                    )}
                    <Text className={styles.monthYears} size="16" fontStyle="poppins500">
                        {monthNames[lang][month]} {variant === "month" && year} 
                    </Text>
                { variant === "month" &&(
                    <Button onClick={nextMonth} variant="clear" noPadding>
                        <ArrowIcon rotate="right" size="25" />
                    </Button>
                )}
                </Stack>
                
            </Stack>
        </Stack>
        
        {/* GRID */}
        <Stack className={getStyles(styles.containerCells,{[styles.year]: variant === "year"},[])} gap={24} fullWidth>
            {variant === "month" &&
                daysOfWeek[lang].map(d => (
                    <Text
                    key={d}
                    fontStyle="poppins500"
                    size="16"
                    >
                    {d}
                    </Text>
                ))
            }
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
                variant={variant}
            />
            ))}
        </Stack>
        </Stack>
    );
};
