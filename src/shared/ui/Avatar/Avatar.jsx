import { getAvatarColor } from "@/shared/lib/avatar/getAvatarColor";
import { Stack } from '@/shared/ui/Stack/Stack';
import { Text } from "@/shared/ui/Text/Text";
import styles from './Avatar.module.scss';

export const Avatar = ({ email, firstName, lastName, size = 40 }) => {
    const bgColor = getAvatarColor(email);
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

    return (
        <Stack
            className={styles.avatar}
            align='center'
            justify='center'
            style={{
                width: size,
                height: size,
                backgroundColor: bgColor,
            }}
        >
        <Text color='text-inverse' size='20' fontStyle="poppins500">{initials}</Text>
        </Stack>
    );
};
