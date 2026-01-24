import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./EventItem.module.scss";
import { getStyles } from '@/shared/lib/getStyles';
import { EventItemEditModal } from "../EventItemEditModal/EventItemEditModal";
import { useTranslation } from "react-i18next";
import { formatEventDayLabel } from "../../../../features/calendar/model/formatEventDayLabel";
import { RefreshIcon } from "../../../../assets/svg/Icons";
import { useState, useRef, useEffect } from "react";
import { ArrowIcon } from "../../../../assets/svg/ArrowIcon";



export const EventItem = ({ event, onEdit  }) => {

    const { t, i18n } = useTranslation('common');
    const [expanded, setExpanded] = useState(false);
    const itemRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
        if (itemRef.current && !itemRef.current.contains(e.target)) {
            setExpanded(false);
        }
        };

        if (expanded) {
        document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [expanded]);
    

    return (
        <Stack className={getStyles(
            styles.eventItemActive,
            {
            [styles.eventItemPast]: event.isPast,
            [styles.eventItemToday]: event.isToday && !event.isPast,
            },[])} 
            ref={itemRef}
            direction='column' 
            justify='between'
            gap='12' 
            fullWidth
        >
            <Stack justify='between' align='center' fullWidth >
                <Stack justify='between' fullWidth>
                    <Stack gap='8' >
                        <Text color='text-inverse' fontStyle="poppins300" size='14'>
                            {formatEventDayLabel(event.start, i18n.language)}
                        </Text>
                            
                    </Stack>
                    <Text  color='text-inverse' fontStyle="poppins300" size='14'>
                        {event.timeLabel}
                    </Text>
                </Stack>
                </Stack>
            {/* Заголовок + кнопка */}
                <Stack justify='between' fullWidth>
                    <Text color="text-inverse" className={!expanded && styles.title}>
                        {event.title}
                    </Text>

                    {event.title.length > 40 && (
                        <button className={styles.expandBtn} onClick={() => setExpanded(prev => !prev)}>
                        <ArrowIcon color="text-inverse" rotate={expanded ? "top" : "down"} />
                        </button>
                    )}
                    </Stack>
            <Stack justify='between' align='center' fullWidth>
                <Stack gap='8'>
                    {event.remainingLabel && (
                        <Text size="14" color='text-inverse' fontStyle="poppins200">
                            {typeof event.remainingLabel === "string"
                            ? t(event.remainingLabel.key)
                            : t(event.remainingLabel.key, { count: event.remainingLabel.count })}
                        </Text>
                        )}
                    {event.repeatWeekly && <RefreshIcon className={styles.refreshIcon} color="text_inverse" size="18"/>}
                </Stack>
                <Stack>
                    <EventItemEditModal event={event} onEdit={onEdit}/>
                </Stack>
            </Stack>
        </Stack>
    );
};