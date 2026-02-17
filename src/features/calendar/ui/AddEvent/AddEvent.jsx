import { Button } from "@/shared/ui/Button/Button";
import styles from './AddEvent.module.scss'
import { EditCircleIcon } from "../../../../assets/svg/Icons";
import { Stack } from "../../../../shared/ui/Stack/Stack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const AddEventButton = () => {
    const { isAuthenticated } = useAuth(); // 👈 теперь правильно
    const navigate = useNavigate();
    const { t } = useTranslation("common");

    const handleAddEvent = () => {
        if (!isAuthenticated) {
            toast.info(t("toast.Please log in to continue"));
            return;
        }

        navigate('/create-event')
    };

    return (
        <Stack>
            <Button 
                className={styles.addEventBtn} 
                onClick={handleAddEvent}
                
            >
                <EditCircleIcon size={30}/>
            </Button>
        </Stack>
    );
};