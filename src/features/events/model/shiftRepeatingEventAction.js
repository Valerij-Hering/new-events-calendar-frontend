import { toast } from "react-toastify";
import { shiftEventToNextWeek } from "../model/shiftEventToNextWeek";


export const shiftRepeatingEventAction = async ({ event, updateEvent, t }) => {
    try {
        if (!event.repeatWeekly) return event;

        let currentStart = event.start;
        let currentEnd = event.end;

        let shifted = null;
        let iterations = 0;
        const now = new Date();

        // переносим, пока дата в прошлом, но не более 20 итераций
        while (new Date(currentStart) < now && iterations < 20) {
        shifted = shiftEventToNextWeek({ start: currentStart, end: currentEnd, allDay: event.allDay });
        currentStart = shifted.start;
        currentEnd = shifted.end;
        iterations++;
        }

        if (!shifted) return event;

        // формируем patch только из полей модели
        const patch = { start: currentStart };
        if (currentEnd) patch.end = currentEnd;

        // обновляем на сервере
        await updateEvent({ id: event._id, ...patch }).unwrap();
        toast.success(t("eventItem.toast.Event movedo"));

        return { ...event, start: currentStart, end: currentEnd };
    } catch (err) {
        console.error("Error shifting event:", err);
        toast.error(t("eventItem.toast.Move failed"));
        return event;
    }
};