import { Stack } from "../../../../shared/ui/Stack/Stack"
import { Text } from "../../../../shared/ui/Text/Text"
import { ArrowIcon } from "@/assets/svg/ArrowIcon";
import styles from "./CalendarViewSwitcher.module.scss"
import { useTranslation } from "react-i18next";
import { useBoolean } from "../../../../shared/hooks/useBoolean";
import { useEffect } from "react";
import { useRef } from "react";
import { CheckIcon } from "../../../../assets/svg/CheckIcon";


export const CalendarViewSwitcher = ({ viewMode, onChange }) => {

    const { t } = useTranslation("common");
    const { value: isOpen, toggle, setFalse: close } = useBoolean(false);
    const ref = useRef(null);

    const handleSelect = (mode) => {
        onChange(mode);
        close();
        };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                close();
            }
        };
        if (isOpen) document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, close]);

    return (
        <Stack className={styles.claendarViewwitcher} ref={ref}>
            <Stack className={styles.switcherModalBtnChange_btn} onClick={toggle} justify="center" align="center">
                <Text fontStyle="poppins500">{t(`eventList.${viewMode}`)}</Text>
                <ArrowIcon rotate="down" size="25" color="text-primary"/>
            </Stack>
            {isOpen &&
            <Stack className={styles.viewSwitcherModal} direction="column">
                <Stack className={styles.switcherModalBtn} onClick={() => handleSelect("day")} justify="between" align="center" fullWidth >
                    <Text tag="span" color="blackSoft" size={13}>{t("eventList.day")}</Text>
                    {viewMode === 'day' && <CheckIcon className={styles.checkIcon} color="blue" size={16}/>}
                </Stack>
                <Stack className={styles.switcherModalBtn} onClick={() => handleSelect("week")} justify="between" align="center" fullWidth >
                    <Text tag="span" color="blackSoft" size={13}>{t("eventList.week")}</Text>
                    {viewMode === 'week' && <CheckIcon className={styles.checkIcon} color="blue" size={16}/>}
                </Stack>
                <Stack className={styles.switcherModalBtn} onClick={() => handleSelect("month")} justify="between" align="center" fullWidth >
                    <Text tag="span" color="blackSoft" size={13}>{t("eventList.month")}</Text>
                    {viewMode === 'month' && <CheckIcon className={styles.checkIcon} color="blue" size={16}/>}
                </Stack>
                <Stack className={styles.switcherModalBtn} onClick={() => handleSelect("year")} justify="between" align="center" fullWidth >
                    <Text tag="span" color="blackSoft" size={13}>{t("eventList.year")}</Text>
                    {viewMode === 'year' && <CheckIcon className={styles.checkIcon} color="blue" size={16}/>}
                </Stack>
            </Stack>
            }
        </Stack>
    )
}