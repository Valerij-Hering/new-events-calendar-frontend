import { useEffect, useState } from "react";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { Button } from "@/shared/ui/Button/Button";
import { MailIcon } from "@/assets/svg/Icons";
import { toast } from "react-toastify";
import styles from "./EmailActivationToastContent.module.scss";
import { Loader } from "../../../shared/ui/Loader/Loader";
import { useTranslation } from "react-i18next";


const RESEND_TIMEOUT = 60;
const STORAGE_KEY = "emailActivationResendUntil";

export const EmailActivationToastContent = ({
    isAuthenticated,
    user,
    isUserLoading,
    resendActivationEmail,
    }) => {
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isResending, setIsResending] = useState(false);
    const { t } = useTranslation("common");

    // 🔄 восстановление таймера после перезагрузки
    useEffect(() => {
        const storedUntil = localStorage.getItem(STORAGE_KEY);
        if (!storedUntil) return;

        const diff = Math.ceil((+storedUntil - Date.now()) / 1000);
        if (diff > 0) setSecondsLeft(diff);
    }, []);

    // ⏱ основной таймер
    useEffect(() => {
        if (secondsLeft <= 0) return;

        const interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    const handleResend = async () => {
        if (isResending || secondsLeft > 0) return;

        try {
        setIsResending(true);
        await resendActivationEmail().unwrap();

        toast.success("Email sent again");

        const until = Date.now() + RESEND_TIMEOUT * 1000;
        localStorage.setItem(STORAGE_KEY, until.toString());
        setSecondsLeft(RESEND_TIMEOUT);
        } catch {
        toast.error("Failed to send email");
        } finally {
        setIsResending(false);
        }
    };

    const progress = secondsLeft / RESEND_TIMEOUT;
    const circumference = 2 * Math.PI * 18;
    const offset = circumference * (1 - progress);

    return (
        <Stack className={styles.container} direction="column" gap="16" align="center">
            <MailIcon className={styles.mailIcon} size="52" color="text_secondary"/>
            <Text size="20" fontStyle="poppins600">
                {t("activationToastContent.Email Confirmation")}
            </Text>
            <Text align="center">
                {t("activationToastContent.We sent an email to")}{" "}<Text tag="span" fontStyle="poppins600">{email}</Text>
                <br />{t("activationToastContent.Please confirm your email address.")}
            </Text>
            <Text color="text-secondary">
                {t("activationToastContent.If you didn't receive it, check Spam or request resend")}
            </Text>

            {/* 🔵 КРУГОВОЙ ТАЙМЕР */}
            {secondsLeft > 0 && (
                <div className={styles.timerWrapper}>
                <svg width="44" height="44">
                    <circle
                    cx="22"
                    cy="22"
                    r="18"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="none"
                    />
                    <circle
                    cx="22"
                    cy="22"
                    r="18"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={styles.progress}
                    />
                </svg>
                <span>{secondsLeft}{t("activationToastContent.timer.s")}</span>
                </div>
            )}

            <Button
                fullWidth
                disabled={isResending || secondsLeft > 0}
                onClick={handleResend}
            >
                {isResending
                ? <><Loader color='text_inverse' strokeWidth="7" size="18"/> {t("button.Resending...")}</>
                : secondsLeft > 0
                ? t("button.Please wait")
                : t("button.Resend confirmation mail")}
            </Button>
        </Stack>
    );
};
