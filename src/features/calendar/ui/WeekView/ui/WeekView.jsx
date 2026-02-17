import { useMemo, useEffect, useState } from "react";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./WeekView.module.scss";
import { startOfWeek, addDays, addWeeks, format } from "date-fns";
import { Button } from "@/shared/ui/Button/Button";
import { ArrowIcon } from "@/assets/svg/ArrowIcon";
import { ru, de } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { startOfDay, endOfDay, isWithinInterval } from "date-fns";

const MINUTES_IN_DAY = 1440;

export const WeekView = ({ events, selectedDate, onChangeDate }) => {
  const [now, setNow] = useState(new Date());
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const locale = useMemo(() => {
    if (lang.startsWith("ru")) return ru;
    if (lang.startsWith("de")) return de;
    return undefined;
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const weekStart = useMemo(
    () => startOfWeek(selectedDate, { weekStartsOn: 1 }),
    [selectedDate]
  );

  const isCurrentWeek = useMemo(() => {
  return isWithinInterval(now, {
    start: startOfDay(weekStart),
    end: endOfDay(addDays(weekStart, 6)),
  });
}, [now, weekStart]);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const handlePrevWeek = () =>
    onChangeDate(addWeeks(selectedDate, -1));

  const handleNextWeek = () =>
    onChangeDate(addWeeks(selectedDate, 1));

  const getEventsForDay = (day) =>
    
    events.filter(
      (event) =>
        new Date(event.start).toDateString() ===
        day.toDateString()
    );

    const layoutEvents = (events) => {
  const sorted = [...events].sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  const columns = [];

  sorted.forEach(event => {
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : new Date(start.getTime() + 30 * 60000);

    let placed = false;

    for (let col of columns) {
      const lastInCol = col[col.length - 1];
      const lastEnd = lastInCol.end;

      if (start >= lastEnd) {
        col.push({ ...event, start, end });
        placed = true;
        break;
      }
    }

    if (!placed) {
      columns.push([{ ...event, start, end }]);
    }
  });

  return columns.flatMap((col, colIndex) =>
    col.map(event => ({
      ...event,
      column: colIndex,
      totalColumns: columns.length,
    }))
  );
};

  const currentMinutes =
    now.getHours() * 60 + now.getMinutes();

  const isPastEvent = (event) => {
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : null;

    if (event.allDay) {
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
      return startDate < today;
    }

    if (!end) return now > start;
    return now > end;
  };

  return (
    <Stack className={styles.weekContainer} direction="column" fullWidth>
      
      {/* HEADER */}
      <Stack align="center" justify="between" fullWidth>
        <Stack align="center" gap="8">
          <Button onClick={handlePrevWeek} variant="clear" noPadding>
            <ArrowIcon rotate="left" size="25" />
          </Button>

          <Text fontStyle="poppins500" size="16">
            {format(weekStart, "MMMM yyyy", { locale })}
          </Text>

          <Button onClick={handleNextWeek} variant="clear" noPadding>
            <ArrowIcon rotate="right" size="25" />
          </Button>
        </Stack>
      </Stack>

      {/* DAYS HEADER */}
      <Stack className={styles.daysHeader} fullWidth>
        <Stack className={styles.timeHeader} fullWidth/>
        {weekDays.map((day) => {
          const isToday = now.toDateString() === day.toDateString();
          return (
            <Stack
              direction="column"
              align="center"
              key={day.toISOString()}
              className={`${styles.dayHeader} ${isToday ? styles.todayHeader : ""}`}
            >
              <div>{format(day, "dd", { locale })}</div>
              <div>{format(day, "EEE", { locale })}</div>
            </Stack>
          );
        })}
      </Stack>


      {/* GRID */}
      <Stack className={styles.gridWrapper} fullWidth>

        {/* TIME COLUMN */}
        <Stack className={styles.timeColumn}>
          <Stack className={styles.timeInner}direction="column">
            {Array.from({ length: 24 }).map((_, hour) => (
              <Text key={hour} className={styles.timeCell}>
                {String(hour).padStart(2, "0")}:00
              </Text>
            ))}

            {/* NOW LABEL */}
            {isCurrentWeek && (
                <Text
                align="center"
                    className={styles.nowTimeLabel}
                    style={{
                    top: currentMinutes,
                    position: "absolute",
                    transform: "translateY(-50%)",
                    }}
                >
                    {format(now, "HH:mm")}
                </Text>
                )}
          </Stack>
        </Stack>

        {/* DAYS */}
        {weekDays.map((day) => {
          const isToday =
            now.toDateString() === day.toDateString();

          return (
            <Stack key={day.toISOString()} className={`${styles.dayColumn} ${isToday ? styles.todayColumn : ""}`}>
              <Stack className={styles.dayInner} direction="column" fullWidth>

                {layoutEvents(getEventsForDay(day)).map((event) => {
                  const isAllDay = event.allDay;
                  const past = isPastEvent(event);
                  
                  let style = {};
                  if (!isAllDay) {
                    const startDate = new Date(event.start);
                    const startMinutes =
                      startDate.getHours() * 60 +
                      startDate.getMinutes();

                    const duration = event.end
                      ? (new Date(event.end) - startDate) / 60000
                      : 40;

                    const columnWidth = 100 / event.totalColumns;

                    style = {
                      top: startMinutes,
                      height: duration,
                      left: `${event.column * columnWidth}%`,
                      width: `${columnWidth}%`,
                    };
                  }
                  return (
                    <Stack
                    fullWidth
                      key={event._id}
                      className={`${styles.event}
                        ${isAllDay ? styles.allDayEvent : ""}
                        ${past ? styles.pastEvent : ""}`}
                      style={style}
                    >
                      {event.title}
                    </Stack>
                  );
                })}

                {/* NOW LINE */}
                {isToday && (
                  <Stack
                    className={styles.nowLine}
                    style={{ top: currentMinutes }}
                  />
                )}

              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};