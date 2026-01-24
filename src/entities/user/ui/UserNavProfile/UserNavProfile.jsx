import { Stack } from "@/shared/ui/Stack/Stack";
import styles from './UserNavProfile.module.scss';
import { Text } from "@/shared/ui/Text/Text";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { UserIcon } from "@/assets/svg/Icons";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useResize } from "../../../../shared/hooks/useResize";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { MailIcon } from "../../../../assets/svg/Icons";


export const UserNavProfile = () => {

    const { user, isAuthenticated } = useAuth();
    const { isMobile } = useResize();
    const { t, i18n } = useTranslation('common');

    console.log(user)


    return (
        <Stack >
            { isAuthenticated && user ? (
                <Stack align='center' gap='12'>
                    <Stack className={styles.containerUserProfile}>
                        <Avatar email={user.email} firstName={user.firstName} lastName={user.lastName} size={40} />
                    </Stack>
                    {!isMobile &&
                        <Stack direction='column' gap={i18n.language === 'ru' ? '4' : ''}>
                            <Text>{user.firstName} {user.lastName}</Text>
                            <Text color='text-secondary' size='14'>{user.email}</Text>
                        </Stack>
                    }
                </Stack>
            ) : (
                <Stack align='center' gap='12'>
                    <UserIcon size='55'/>
                    {!isMobile &&
                        <Stack direction='column' gap={i18n.language === 'ru' ? '4' : ''}>
                            <Text>{t("userNavProfil.Guest")}</Text>
                            <Text color='text-secondary' size='14'>name@example.com</Text>
                        </Stack>
                    }
                </Stack>
            )}
        </Stack>
    )
}