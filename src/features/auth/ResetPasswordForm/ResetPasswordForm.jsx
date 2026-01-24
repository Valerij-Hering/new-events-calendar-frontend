import { Stack } from '@/shared/ui/Stack/Stack';
import { Button } from '@/shared/ui/Button/Button';
import { Text } from "@/shared/ui/Text/Text";
import styles from './ResetPasswordForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { emailRegex, validMessage } from '../../../shared/lib/validation';
import { useResetPasswordMutation } from '../api/userApi';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from '../../../widgets/LanguageSwitcher/ui/LanguageSwitcher';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { Loader } from '../../../shared/ui/Loader/Loader';
import { CheckCircleIcon } from '../../../assets/svg/Icons';
import { Logo } from '../../../shared/ui/Logo/Logo';




export const ResetPasswordForm = () => {

    const methods = useForm({
            mode: "onBlur", //onSubmit, onBlur, onChange, onTouched, all
            defaultValues: {
                email: "",
            }
        });
    
    const { register, reset, handleSubmit, formState: { errors } } = methods;
    const { t, i18n } = useTranslation("common");
    const lang = i18n.language;
    const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
    const [isSuccess, setIsSuccess] = useState(false);
    const { clearErrors } = methods; // методы формы
    
    useEffect(() => {
        clearErrors(); // удаляет все ошибки при смене языка
    }, [i18n.language, clearErrors]);

    const onSubmit = async (formData) => {
        const { email } = formData;
        try {
            const result = await resetPassword({ email }).unwrap();
            console.log(result); 
            setIsSuccess(true); 
            reset()
        } catch (error) {
            toast.error(t("toast.Error sending email"), error);
        }
    };

    return (
        <Stack className={styles.overlay} justify='center' align='center' fullWidth >
            <Stack className={styles.container} gap='48' direction='column'>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack  gap='24' direction='column'fullWidth>
                        {isSuccess ? (
                            <Stack direction='column' gap="24" align="center">
                                <CheckCircleIcon color='text_success' size='70'/>
                            <Text align='center' fontStyle="poppins500" size="18">{t('form.resetPasswordForm.Password reset instructions have been sent to your email address')}</Text>
                            </Stack>
                        ) : (
                            <Stack gap='32' direction='column' fullWidth>
                                <Stack justify='between' align='end' fullWidth>
                                    <Logo/>
                                    <LanguageSwitcher/>
                                </Stack>
                                <br/>
                                <br/>
                                <Stack direction='column'  gap='12'>
                                    <Text tag="h2" fontStyle="poppins600">{t('form.resetPasswordForm.Reset Password')}</Text>
                                    <Text align='start' className={styles.diskr}>{t("form.resetPasswordForm.Don't worry. W'll send you reset instructions")}</Text>
                                </Stack>
                                <Input
                                    type='email' 
                                    label={t("input.label.Email")}
                                    placeholder={t("input.placeholder.Your Email")}
                                    {...register("email", {
                                        required: validMessage[lang].required,
                                        pattern: {
                                            value: emailRegex,
                                            message: validMessage[lang].errors.validEmail
                                        }
                                    })}
                                    
                                    required 
                                    fullWidth
                                    error={errors.email}
                                />
                                <Button type="submit" disabled={isLoading} fullWidth>
                                    {isLoading ? (
                                        <Stack direction="row" align="center" justify="center" gap="8">
                                            <Loader color='text_inverse' strokeWidth="7" size="18"/>
                                            <Text color='text-inverse' tag="span"> {t("button.Sending...")}</Text>
                                        </Stack>
                                    ) : (
                                        t("button.Send")
                                    )}
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                    
                </form>
                <Stack justify="center" fullWidth>
                    <Text>{t('form.resetPasswordForm.Remember password?')}<Link to='/login' className={styles.singin_link}> {t('form.Log in')}</Link></Text>
                </Stack>
            </Stack>
        </Stack>
    )
}