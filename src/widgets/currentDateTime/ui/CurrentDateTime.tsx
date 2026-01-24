import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "../../../shared/ui/Text/Text";
import { Stack } from "../../../shared/ui/Stack/Stack";


export const CurrentDateTime = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { t, i18n } = useTranslation("common");

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatDate = (date: Date) =>
        new Intl.DateTimeFormat(i18n.language, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        }).format(date);

    const formatTime = (date: Date) =>
        `${String(date.getHours()).padStart(2, "0")} : 
        ${String(date.getMinutes()).padStart(2, "0")} : 
        ${String(date.getSeconds()).padStart(2, "0")}`;

    return (
        <Stack direction="column" align="center" gap="4">
            {/* <Text size="22">{formatTime(currentDate)}</Text> */}
            <Text color="text-secondary">{formatDate(currentDate)}</Text>
        </Stack>
    );
};
