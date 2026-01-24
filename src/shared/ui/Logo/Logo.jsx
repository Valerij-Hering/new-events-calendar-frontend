import styles from "./Logo.module.scss";
import { Stack } from '@/shared/ui/Stack/Stack';
import { Text } from "@/shared/ui/Text/Text";
import CalendarLogoIcon from "../../../assets/svg/CalendarLogoIcon.svg";
import { Calendar } from "lucide-react";


export const Logo = () => {

    return (
        <Stack align='center'>
            <img className={styles.logoIcon} src={CalendarLogoIcon}/>
            <Stack className={styles.containerLogo} justify='center' direction='column'>
                <Text className={styles.logoTitle} tag='span' size='24' color='text-accent-primary' fontStyle="genos600">Events</Text>
                <Text className={styles.logoTitle2}  tag="span" size='18'  fontStyle="genos600">Calendar</Text>
            </Stack>
        </Stack>
    )
}