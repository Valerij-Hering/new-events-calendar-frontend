import { toast } from "react-toastify";
import { shiftEventToNextWeek } from "./shiftEventToNextWeek";

/* -------------------------------------------------------------------------- */
/*                              DELETE EVENT                                  */
/* -------------------------------------------------------------------------- */
export const deleteEventAction = async ({ id, deleteEvent, t, close }) => {
    if (!id) {
        console.error("Delete failed: id is undefined");
        return;
    }
    try {
        await deleteEvent(id).unwrap();
        t && toast.success(t("eventItem.toast.Event deleted"));
        close();
    } catch (err) {
        console.error(err);
        t && toast.error(t("eventItem.toast.Failed to delete event"));
    }
};

/* -------------------------------------------------------------------------- */
/*                              UPDATE EVENT                                  */
/* -------------------------------------------------------------------------- */
/**
 *  Обновление события
 *  @param updateEvent — RTK Query mutation
 *  @param id — ID события
 *  @param patch — обновляемые поля
 *  @param t — i18n translate
 */
export const updateEventAction = async ({ updateEvent, id, patch, t }) => {
    try {
        await updateEvent({ id, ...patch }).unwrap();
        toast.success(t("createEventForm.updateEventToast.Event updated successfully"));
        return true;
    } catch (err) {
        console.error("Update failed:", err);
        toast.error(t("createEventForm.updateEventToast.Event update failed"));
        return false;
    }
};


/* -------------------------------------------------------------------------- */
/*                              SHIFT EVENT                                   */
/* -------------------------------------------------------------------------- */
export const shiftEventAction = async ({ updateEvent, event, t }) => {
    if (!event?._id) {
        console.error("Shift failed: event id is undefined");
        toast.error (t("eventItem.toast.Move failed"));
        return;
    }

    try {
        const shifted = shiftEventToNextWeek(event);

        await updateEvent({ 
        id: event._id, 
        start: shifted.start, 
        ...(shifted.end && { end: shifted.end }) 
        }).unwrap();

        toast.success(t("eventItem.toast.Move failed"));
    } catch (err) {
        console.error("Error shifting event:", err);
        toast.error(t("eventItem.toast.Event moved"));
    }
};


/* -------------------------------------------------------------------------- */
/*                              AUTOSHIFT EVENT                               */
/* -------------------------------------------------------------------------- */

export const autoShiftEventAction = async ({ event, updateEvent, t }) => {
    try {
        if (!event.repeatWeekly) return;

        const now = new Date();
        const start = new Date(event.start);
        const end = event.end ? new Date(event.end) : null;

        // если событие уже прошло — вычисляем новую дату (всегда вперёд)
        if (end ? end < now : start < now) {
        const shifted = shiftEventToNextWeek(event);

        // отправляем только те поля, которые есть в модели
        const patch = { start: shifted.start };
        if (shifted.end) patch.end = shifted.end;

        await updateEvent({ id: event._id, ...patch }).unwrap();

        toast.info(t("eventItem.toast.Event moved"));
        }
    } catch (err) {
        console.error("Auto shift failed:", err);
        toast.error(t("eventItem.toast.Move failed"));
    }
};


/* -------------------------------------------------------------------------- */
/*                             TOGGLE AUTOSHIFT EVENT                         */
/* -------------------------------------------------------------------------- */
export const toggleRepeatWeeklyAction = async ({ event, updateEvent, repeatWeekly, t }) => {
    try {
        const patch = { repeatWeekly }; // чистый patch
        await updateEvent({ id: event._id, ...patch }).unwrap();
        toast.success(
        repeatWeekly
            ? t("eventItem.toast.Auto-shift enabled")
            : t("eventItem.toast.Auto-shift disabled")
        );
        return { ...event, repeatWeekly }; // для фронта
    } catch (err) {
        console.error("Error updating repeatWeekly:", err);
        toast.error(t("eventItem.toast.Auto-shift failed"));
        return event;
    }
};