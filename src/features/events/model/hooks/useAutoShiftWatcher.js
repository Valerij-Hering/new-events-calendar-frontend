import { useEffect } from "react";
import { autoShiftEventAction } from "../eventActions";

export const useAutoShiftWatcher = (events, updateEvent, t) => {
    useEffect(() => {
        const interval = setInterval(() => {
        events.forEach(event => {
            if (event.repeatWeekly) {
            autoShiftEventAction({ event, updateEvent, t });
            }
        });
        }, 30_000); // проверка каждые 30 сек

        return () => clearInterval(interval);
    }, [events, updateEvent, t]);
};
