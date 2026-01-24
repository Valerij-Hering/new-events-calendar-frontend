import { useState } from "react";

export const useEditEvent = () => {
  const [editEvent, setEditEvent] = useState(null);

  const handleEdit = (event) => {
    const getTimeString = (date) => {
      if (!date) return "";
      // используем локальные часы и минуты
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    setEditEvent({
      id: event._id,
      title: event.title,
      date: event.start
        ? `${event.start.getFullYear()}-${String(event.start.getMonth() + 1).padStart(2, "0")}-${String(event.start.getDate()).padStart(2, "0")}`
        : "",
      startTime: getTimeString(event.start),
      endTime: getTimeString(event.end),
      allDay: event.allDay,
      repeatWeekly: event.repeatWeekly,
    });
  };

  return { editEvent, setEditEvent, handleEdit };
};
