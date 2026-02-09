import { Stack } from "@/shared/ui/Stack/Stack";
import styles from './UserNavProfile.module.scss';
import { Text } from "@/shared/ui/Text/Text";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { UserIcon } from "@/assets/svg/Icons";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useResize } from "../../../../shared/hooks/useResize";
import { useTranslation } from "react-i18next";
import { EditUserProfile } from "../editUserProfile/EditUserProfile";
import { useBoolean } from "../../../../shared/hooks/useBoolean";
import { useRef } from "react";
import { useEffect } from "react";
import { SettingsIcon } from "../../../../assets/svg/Icons";
import { ArrowIcon } from "../../../../assets/svg/ArrowIcon";


export const UserNavProfile = () => {

    const { user, isAuthenticated } = useAuth();
    const { isMobile } = useResize();
    const { t, i18n } = useTranslation('common');
    const { value: isOpen, toggle, setFalse: close } = useBoolean(false);
    const ref = useRef(null);

    console.log(user)


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
        <Stack ref={ref}>
            { isAuthenticated && user ? (
                <Stack className={styles.userProfile} align='center' gap='12'>
                    <Stack  className={styles.containerUserProfile} onClick={toggle}>
                        <Avatar image={user.avatarUrl} email={user.email} firstName={user.firstName} lastName={user.lastName} size={45} />
                        <SettingsIcon color="text_primary" className={styles.settingsIcon} size="15"/>
                    </Stack>
                    {!isMobile &&
                        <Stack direction='column' gap={i18n.language === 'ru' ? '4' : ''}>
                            <Text>{user.firstName} {user.lastName}</Text>
                            <Text color='text-secondary' size='14'>{user.email}</Text>
                        </Stack>
                    }
                    {isOpen && (
                        <Stack className={styles.containerEditUserProfile}>
                            <EditUserProfile onClose={close}/>
                        </Stack>
                    )}
                    {/* <ArrowIcon color="text-primary"/> */}
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