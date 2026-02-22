import { Stack } from "@/shared/ui/Stack/Stack";
import { CalendarGrid } from "../CalendarGrid/CalendarGrid";
import { Button } from "@/shared/ui/Button/Button";
import { ArrowIcon } from "@/assets/svg/ArrowIcon";
import { useYearCalendar } from "../../model/useYearCalendar";
import { Text } from "@/shared/ui/Text/Text";
import { useResize } from "../../../../shared/hooks/useResize";
import styles from "./YearCalendar.module.scss"



export const YearCalendar = ({ eventsByDate, selectedDate, onSelectDate }) => {
    const { year, prevYear, nextYear } = useYearCalendar();
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
        <Stack direction="column" gap="16">
        {/* Навигация по годам */}
        <Stack justify="center" align="center" gap="8" >
            <Button variant="clear" noPadding onClick={prevYear}>
                <ArrowIcon rotate="left" size="25" />
            </Button>
            <Text color="text-primary" fontStyle="poppins500">{year}</Text >
            <Button variant="clear" noPadding onClick={nextYear}>
                <ArrowIcon rotate="right" size="25" />
            </Button>
        </Stack>

        {/* 12 месяцев */}
        <Stack className={styles.containerMnthGrid} justify="between" wrap gap="24">
            {months.map((month) => (
            <CalendarGrid
                key={month}
                currentDate={new Date(year, month, 1)}
                eventsByDate={eventsByDate}
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
                hideNavigation={true}  // убираем стрелки в каждом месяце
                variant="year"
            />
            ))}
        </Stack>
        </Stack>
    );
};
