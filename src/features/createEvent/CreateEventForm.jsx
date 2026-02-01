import { useState, useEffect } from "react";
import styles from "./CreateEventForm.module.scss";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Button } from "@/shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TimePicker } from "@/shared/ui/TimePicker/TimePicker";
import { DatePicker } from "@/shared/ui/DatePicker/DatePicker";
import { Textarea } from "@/shared/ui/Textarea/Textarea";
import { ToggleCheckbox } from "@/shared/ui/ToggleCheckbox/ToggleCheckbox";
import { useCreateEventMutation, useUpdateEventMutation } from "./api/eventApi";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import LanguageSwitcher from "../../widgets/LanguageSwitcher/ui/LanguageSwitcher";
import { Logo } from "../../shared/ui/Logo/Logo";
import { validMessage, validateEndTime } from "@/shared/lib/validation";
import { useForm } from "react-hook-form";
import { getStyles } from "../../shared/lib/getStyles";
import { toast } from "react-toastify";
import { Loader } from "../../shared/ui/Loader/Loader";
import { Text } from "@/shared/ui/Text/Text";



export const CreateEventForm = ({ initialData, onClose }) => {
    const { t, i18n } = useTranslation("common");
    const lang = i18n.language;
    const messages = validMessage[lang];

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
    const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

    // Всегда Date для selectedDate
    const [selectedDate, setSelectedDate] = useState(
        initialData?.date ? new Date(initialData.date) : null
    );
    const [start, setStart] = useState(initialData?.startTime || "");
    const [end, setEnd] = useState(initialData?.endTime || "");
    const [allDay, setAllDay] = useState(initialData?.allDay || false);
    const [repeatWeekly, setRepeatWeekly] = useState(initialData?.repeatWeekly || false);

    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({
        mode: "all",
        defaultValues: {
        date: initialData?.date || "",
        startTime: initialData?.startTime || "",
        endTime: initialData?.endTime || "",
        title: initialData?.title || "",
        allDay: initialData?.allDay || false,
        repeatWeekly: initialData?.repeatWeekly || false,
        }
    });

    const watchStart = watch("startTime");

    useEffect(() => { clearErrors(); }, [i18n.language, clearErrors]);

    const handleDateOk = (val) => {
        setSelectedDate(val);
        const formatted = `${val.getFullYear()}-${String(val.getMonth()+1).padStart(2,'0')}-${String(val.getDate()).padStart(2,'0')}`;
        setValue("date", formatted);
    };

    const onSubmit = async (formData) => {
        if (!isAuthenticated) { toast.error(t("You should login")); return; }
        if (!selectedDate) { toast.error(messages.required); return; }

        const dayISO = formData.date; // YYYY-MM-DD

        const payload = allDay
        ? { title: formData.title, start: dayISO, allDay, repeatWeekly }
        : {
            title: formData.title,
            start: start ? `${dayISO}T${start}` : undefined,
            ...(end && { end: `${dayISO}T${end}` }),
            allDay,
            repeatWeekly,
            };

        try {
        if (initialData?.id) {
            await updateEvent({ id: initialData.id, ...payload }).unwrap();
            toast.success(t("form.createEventForm.toast.Event updated successfully"));
        } else {
            await createEvent(payload).unwrap();
            toast.success(t("form.createEventForm.toast.Event created successfully"));
            !onClose && navigate("/");
        }
        onClose?.();
        } catch (err) {
        console.error(err);
        toast.error(initialData?.id ? t("form.createEventForm.toast.Event update failed") : t("form.createEventForm.toast.Event create failed"));
        }
    };

    return (
        <Stack className={styles.overlay} justify="center" align="center" fullWidth>
        <Stack tag="form" direction="column" gap="32" className={styles.containerForm} fullWidth onSubmit={handleSubmit(onSubmit)}>
            <Stack justify="between" align="end" fullWidth>
            <Logo />
            <LanguageSwitcher />
            </Stack>
            <br/>
            <Stack direction="column" gap="16" fullWidth>
            <Stack justify="between" align="centeer" fullWidth>
                <ToggleCheckbox
                    checked={allDay}
                    onChange={(e) => { setAllDay(e.target.checked); setValue("allDay", e.target.checked); }}
                />
                <Text>{t("input.label.All day")}</Text>
            </Stack>
            <Stack justify="between" align="centeer" fullWidth>
                <ToggleCheckbox
                    checked={repeatWeekly}
                    onChange={(e) => { setRepeatWeekly(e.target.checked); setValue("repeatWeekly", e.target.checked); }}
                />
                <Text>{t("input.label.Repeat weekly")}</Text>
            </Stack>

            <DatePicker
                label={t("input.label.Event Date")}
                onOk={handleDateOk}
                value={selectedDate
                ? `${String(selectedDate.getDate()).padStart(2,'0')}.${String(selectedDate.getMonth()+1).padStart(2,'0')}.${selectedDate.getFullYear()}`
                : ''}
            />

            <Stack gap="12" fullWidth>
                <Stack className={getStyles(styles.containerTimePickerStart, { [styles.containerTimePickerStartDisabled]: allDay }, [])} fullWidth>
                <TimePicker
                    align="left"
                    label={t("input.label.Start Time")}
                    disabled={allDay}
                    value={start}
                    onOk={(val) => { setStart(val); setValue("startTime", val, { shouldValidate: true }); }}
                    {...register("startTime", { required: !allDay ? messages.required : false })}
                    error={!allDay ? errors.startTime : undefined}
                />
                </Stack>

                <Stack className={getStyles(styles.containerTimePickerEnd, { [styles.containerTimePickerEndDisabled]: allDay || !watchStart }, [])} fullWidth>
                <TimePicker
                    align="right"
                    label={t("input.label.End Time")}
                    disabled={allDay || !watchStart}
                    value={end}
                    onOk={(val) => { setEnd(val); setValue("endTime", val, { shouldValidate: true }); }}
                    {...register("endTime", { validate: (val) => validateEndTime(val, watch("startTime"), i18n.language) })}
                    error={errors.endTime}
                />
                </Stack>
            </Stack>

            <Textarea
                label={t("input.label.Your Event")}
                placeholder={t("input.placeholder.Enter here...")}
                maxLength={300}
                {...register("title",{ required: messages.required })}
                fullWidth
                error={errors.title}
            />
            </Stack>

            <Stack justify="between" gap="12" fullWidth>
            <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating
                ? isUpdating
                    ? <><Loader color='text_inverse' strokeWidth="7" size="18"/> {t("button.Updating...")}</>
                    : <><Loader color='text_inverse' strokeWidth="7" size="18"/> {t("button.Creating...")}</>
                : initialData?.id
                    ? t("button.Update")
                    : t("button.Create")
                }
            </Button>
            <Button variant="clear" color='dark' noPadding type="button" onClick={() => { onClose?.(); !onClose && navigate("/"); }}>
                {t("button.Close")}
            </Button>
            </Stack>
        </Stack>
        </Stack>
    );
};
