import { useMemo, useEffect, useState } from "react";
import { Stack } from "../../../../../shared/ui/Stack/Stack";
import { Text } from "../../../../../shared/ui/Text/Text";

import styles from "./DayView.module.scss";
import { format } from "date-fns";
import { Button } from "@/shared/ui/Button/Button";
import { ArrowIcon } from "@/assets/svg/ArrowIcon";
import { ru, de } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { getStyles } from "../../../../../shared/lib/getStyles";

export const DayView = ({ events, selectedDate, onChangeDate }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const locale = useMemo(() => {
    if (lang.startsWith("ru")) return ru;
    if (lang.startsWith("de")) return de;
    return undefined; 
  }, [lang]);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const allDayEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          event.allDay &&
          new Date(event.start).toDateString() ===
            new Date(selectedDate).toDateString()
      ),
    [events, selectedDate]
  );

  const hours = useMemo(() => Array.from({ length: 24 }), []);

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    onChangeDate(prev.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    onChangeDate(next.toISOString().split("T")[0]);
  };

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isToday = new Date(selectedDate).toDateString() === now.toDateString();

  const dayEvents = useMemo(() => {
    return events
      .filter(
        e =>
          !e.allDay &&
          new Date(e.start).toDateString() ===
            new Date(selectedDate).toDateString()
      )
      .map(e => {
        const start = new Date(e.start);
        const end = e.end
          ? new Date(e.end)
          : new Date(start.getTime() + 30 * 60000);

        return { ...e, start, end };
      })
      .sort((a, b) => a.start - b.start);
  }, [events, selectedDate]);

  const layoutEvents = (events) => {
    const columns = [];

    events.forEach(event => {
      let placed = false;

      for (let col of columns) {
        const last = col[col.length - 1];
        if (event.start >= last.end) {
          col.push(event);
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([event]);
      }
    });

    return events.map(event => {
      let columnIndex = 0;
      let totalColumns = columns.length;

      columns.forEach((col, i) => {
        if (col.includes(event)) columnIndex = i;
      });

      return {
        ...event,
        columnIndex,
        totalColumns,
      };
    });
  };

  return (
    <Stack className={styles.dayViewContainer} direction="column" fullWidth gap={16}>
      {/* HEADER */}
      <Stack className={styles.containerPrevNextBtn} align="center" justify="between" >
        <Button onClick={handlePrevDay} variant="clear" noPadding>
          <ArrowIcon rotate="left" size="25" />
        </Button>
        <Text fontStyle="poppins500" size="16">
          {format(new Date(selectedDate), "EEE, dd MMMM yyyy", { locale })}
        </Text>
        <Button onClick={handleNextDay} variant="clear" noPadding>
          <ArrowIcon rotate="right" size="25" />
        </Button>
      </Stack>

      {/* ALL DAY EVENTS */}
      

      {/* HOURS */}
<Stack className={styles.containerHour}  fullWidth>

  {/* TIME COLUMN */}
  <Stack className={styles.timeColumn} direction="column">
  {Array.from({ length: 24 }).map((_, hour) => (
    <Stack key={hour} className={styles.hourCell}>
      <Text className={styles.hourLabel} color="text-secondary">
        {String(hour).padStart(2, "0")}:00
      </Text>
    </Stack>
  ))}
</Stack>

  {/* DAY GRID */}
  <Stack className={styles.dayGrid} direction="column" fullWidth>

    {Array.from({ length: 24 }).map((_, hour) => (
      <Stack key={hour} className={styles.hourLine} fullWidth/>
    ))}

    {layoutEvents(dayEvents).map(event => {
  const startMinutes =
    event.start.getHours() * 60 + event.start.getMinutes();

  const duration =
    (event.end - event.start) / 60000;

  const width = 100 / event.totalColumns;

  const isPast =
    isToday && event.end.getTime() < now.getTime();

  return (
    <Stack
      key={event._id}
      className={getStyles(
        styles.event,
        { [styles.pastEvent]: isPast },[]
      )}
      style={{
        top: startMinutes,
        height: duration,
        left: `${event.columnIndex * width}%`,
        width: `${width}%`,
      }}
    >
      {event.title}
    </Stack>
  );
})}
  </Stack>



        {/* линия "сейчас" */}
        {isToday && (
          <>
            <Text
              align="center"
              className={styles.nowTimeLabel}
              style={{
                top: currentMinutes,
                position: "absolute",
                left: 0,
                transform: "translateY(-50%)",
              }}
            >
              {format(now, "HH:mm")}
            </Text>

            <Stack
              className={styles.nowLine}
              style={{ top: currentMinutes }}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
};