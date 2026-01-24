import { Stack } from "@/shared/ui/Stack/Stack";
import LanguageSwitcher from "../../../LanguageSwitcher/ui/LanguageSwitcher";
import styles from './DesktopNavbar.module.scss';
import { Button } from "../../../../shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { UserNavProfile } from "../../../../entities/user/ui/UserNavProfile/UserNavProfile";
import { useResize } from "../../../../shared/hooks/useResize";



export const DesktopNavbar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('common');
    const { isAuthenticated, logout } = useAuth(); 
    const { isMobile } = useResize();

    const handleLogIn = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <Stack tag="nav" className={styles.desktopNavbar} justify='between' align='center' fullWidth>
            <UserNavProfile/>
            <Stack align='center' gap='24'>
                <LanguageSwitcher />
                {isAuthenticated ? (
                    <Button variant='raised' size={isMobile ? 'small' : 'medium'} onClick={handleLogout}>
                        {t('button.Log Out')}
                    </Button>
                ) : (
                    <Button variant='raised' size={isMobile ? 'small' : 'medium'} onClick={handleLogIn}>
                        {t('button.Log In')}
                    </Button>
                )}
            </Stack>
        </Stack>
    );
};
