import { useRef, useEffect } from "react";
import { Stack } from "@/shared/ui/Stack/Stack";
import styles from './EventItemEditModal.module.scss';
import { Button } from "@/shared/ui/Button/Button";
import { BottomBarsIcon } from "@/assets/svg/Icons";
import { Text } from "@/shared/ui/Text/Text";
import { useBoolean } from "@/shared/hooks/useBoolean";
import { useTranslation } from "react-i18next";
import { DeleteIcon, EditCircleIcon, RefreshIcon, RepeatIcon } from "@/assets/svg/Icons";
import { useDeleteEventMutation, useUpdateEventMutation } from "@/features/createEvent/api/eventApi";
import { toast } from "react-toastify";
import { deleteEventAction, shiftEventAction, toggleRepeatWeeklyAction } from "../../../../features/events/model/eventActions";
import { CheckIcon } from "../../../../assets/svg/CheckIcon";
import { useModal } from "../../../../app/providers/ModalProvider/ModalProvider";


export const EventItemEditModal = ({ event, onEdit }) => {
    const { value: isOpen, toggle, setFalse: close } = useBoolean(false);
    const { t } = useTranslation("common");
    const ref = useRef(null);
    const { openModal } = useModal();

    const [deleteEvent] = useDeleteEventMutation();
    const [updateEvent]= useUpdateEventMutation()

    // Закрытие при клике вне модального окна
    useEffect(() => {
        const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            close();
        }
    };

        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, close]);

    // Удаление события
    const handleDelete = () => {
        deleteEventAction({
        id: event._id,
        deleteEvent,
        t,
        close,
        });
    };

    const deleteModal = () => {
        openModal({
        type: "question",
        title: t("eventItem.editModal.openModal.Delete event?"),
        message1: t("eventItem.editModal.openModal.You won’t be able to undo this action"),
        actionLabel: "button.Delete",
        buttonColor: "red",
        onClick: handleDelete,
    });
    }
    // Редактирование события
    const handleEdit = () => {
        if (onEdit) onEdit(event); // передаем событие наверх для открытия формы CreateEventForm
        close();
    };

    //Повтор события
    const handleShift = () => {
        shiftEventAction({ updateEvent, event, t });
        close();
    };

    //Автоповтор
    const handleToggleRepeatWeekly = async () => {
        const newValue = !event.repeatWeekly;
        toggleRepeatWeeklyAction({
            event,
            updateEvent,
            repeatWeekly: newValue,
            t,
        });
        close();
    };

    return (
        <Stack className={styles.containerItemEditModal} ref={ref}>
        <Button onClick={toggle} size="small" color="white" variant="clear" noPadding>
            <BottomBarsIcon size="20" />
        </Button>

        {isOpen && (
            <Stack className={styles.EventItemEditModal} direction="column">
            <Stack className={styles.EventItemEditModalBtn} gap="8" fullWidth onClick={handleEdit}>
                <EditCircleIcon size="18" />
                <Text tag="span" color="text-primary" size="13">
                {t("eventItem.editModal.Edit")}
                </Text>
            </Stack>

            <Stack className={styles.EventItemEditModalBtn} gap="8" fullWidth onClick={handleShift}>
                <RepeatIcon size="18" />
                <Text tag="span" color="text-primary" size="13">
                {t("eventItem.editModal.Repeat")}
                </Text>
            </Stack>

            <Stack className={styles.EventItemEditModalBtn} justify='between'  fullWidth onClick={handleToggleRepeatWeekly}>
                <Stack gap="8">
                    <RefreshIcon size="18" />
                    <Text tag="span" color="text-primary" size="13">
                        {t("eventItem.editModal.Repeat weekly")}
                    </Text>
                </Stack>
                {event.repeatWeekly && <CheckIcon size='18' className={styles.checkIcon}/>}
            </Stack>

            <Stack className={styles.EventItemEditModalDeleteBtn} gap="8" fullWidth onClick={deleteModal}>
                <DeleteIcon size="18" />
                <Text tag="span" color="text-primary" size="13">
                {t("eventItem.editModal.Delete")}
                </Text>
            </Stack>
            </Stack>
        )}
        </Stack>
    );
};
