import { useMemo, useEffect } from "react";
import { EventItem } from "../../../../entities/event/ui/EventItem/EventItem";
import { formatDate } from "../../model/formatDate";
import { Stack } from '@/shared/ui/Stack/Stack';
import { Text } from "@/shared/ui/Text/Text";
import styles from "./EventList.module.scss";
import { useBoolean } from "../../../../shared/hooks/useBoolean";
import { Button } from "../../../../shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { groupEventsByDate } from "../../model/groupEventsByDate";
import { useAuth } from "../../../auth/contexts/AuthContext";

export const EventList = ({
  selectedDate,
  events = [],
  allEvents = [],
  isLoading,
  isError,
  onEdit
}) => {
  const showAll = useBoolean(true);
  const { t } = useTranslation("common");
  const { isAuthenticated } = useAuth();

  // 🔹 если выбрали дату — выключаем "All events"
  useEffect(() => {
    if (selectedDate) {
      showAll.setFalse();
    }
  }, [selectedDate]);

  // 🔹 видимые события
  const visibleEvents = useMemo(() => {
    return showAll.value ? allEvents : events;
  }, [showAll.value, events, allEvents]);

  // 🔹 группировка
  const groupedEvents = useMemo(() => {
    return showAll.value ? groupEventsByDate(visibleEvents) : null;
  }, [showAll.value, visibleEvents]);

  // 🔹 единая логика отображения
  let content = null;

  if (!isAuthenticated) {
    content = (
      <Text>{t("eventList.Please log in to see your events")}</Text>
    );
  } else if (isLoading) {
    content = (
      <Text>{t("eventList.Loading events...")}</Text>
    );
  } else if (isError) {
    content = (
      <Text>{t("eventList.Error loading events")}</Text>
    );
  }  else if (!showAll.value && selectedDate && events.length === 0) {
    content = (
      <Text>{t("eventList.No events for this date")}</Text>
    );
  } else if (visibleEvents.length === 0) {
    content = (
      <Text>{t("eventList.No events")}</Text>
    );
  } else if (showAll.value && groupedEvents) {
    content = Object.entries(groupedEvents).map(([date, dateEvents]) => (
      <Stack key={date} direction="column" gap="8" fullWidth>
        <Text
          className={styles.allEventsDates}
          align="start"
          size="14"
          color="text-primary"
          fontStyle="poppins400"
        >
          {formatDate(date)}
        </Text>

        <Stack direction="column" align="center" gap="12" fullWidth>
          {dateEvents.map(ev => (
            <EventItem
              key={`${ev._id}-${ev.start}`}
              event={ev}
              onEdit={onEdit}
            />
          ))}
        </Stack>
      </Stack>
    ));
  } else {
    // 🔹 режим одной даты
    content = (
      <Stack direction="column" gap="8" fullWidth>
        <Text
          className={styles.allEventsDates}
          align="start"
          size="14"
          color="text-primary"
          fontStyle="poppins400"
        >
          {formatDate(selectedDate)}
        </Text>

        <Stack direction="column" align="center" gap="12" fullWidth>
          {events.map(event => (
            <EventItem
              key={`${event._id}-${event.start}`}
              event={event}
              onEdit={onEdit}
            />
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack className={styles.containerList} direction="column" gap="12" fullWidth>
      {/* 🔹 Заголовок */}
      <Stack
        className={styles.header}
        gap="8"
        justify="between"
        align="end"
        fullWidth
      >
        <Text fontStyle="poppins600" className={styles.title}>
          {showAll.value
            ? t("eventList.All Events")
            : selectedDate
              ? t("eventList.Your Events")
              : t("eventList.Select date")}
        </Text>

        {isAuthenticated && (
          <Button
            size="small"
            variant="subtle"
            color="dark"
            onClick={showAll.setTrue}
          >
            {t("eventList.Show all events")}
          </Button>
        )}
      </Stack>

      {/* 🔹 Контент */}
      <Stack
        className={styles.allEventsContainer}
        direction="column"
        gap="24"
        fullWidth
      >
        {content}
      </Stack>
    </Stack>
  );
};