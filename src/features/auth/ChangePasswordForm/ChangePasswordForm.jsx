import { Stack } from '@/shared/ui/Stack/Stack';
import { Button } from '@/shared/ui/Button/Button';
import { Text } from "@/shared/ui/Text/Text";
import styles from './ChangePasswordForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { validatePassword, validMessage } from '../../../shared/lib/validation';
import {  useParams } from 'react-router-dom';
import { useChangePasswordMutation } from '../api/userApi';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../../widgets/LanguageSwitcher/ui/LanguageSwitcher';
import { CheckCircleIcon, EyeIcon, EyeOffIcon } from '../../../assets/svg/Icons';
import { useEffect } from 'react';
import { useBoolean } from '../../../shared/hooks/useBoolean';
import { toast } from "react-toastify";
import { Loader } from '../../../shared/ui/Loader/Loader';
import { useState } from 'react';
import { Logo } from '../../../shared/ui/Logo/Logo';






export const ChangePasswordForm = () => {

    const methods = useForm({
        mode: "onChange", //onSubmit, onBlur, onChange, onTouched, all
        defaultValues: {
            password: "",
        }
    });

    const { register, reset, handleSubmit, watch, formState: { errors } } = methods;
    const password = watch("password");
    const { t, i18n } = useTranslation("common");
    const lang = i18n.language;
    const [changePassword, { isLoading, error }] = useChangePasswordMutation();
    const { resetToken } = useParams();
    const { clearErrors } = methods;
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const { value: showNewPassword, toggle: toggleNewPassword } = useBoolean(false);
    const { value: showConfirmPassword, toggle: toggleConfirmPassword } = useBoolean(false);

    useEffect(() => {
        clearErrors(); // удаляет все ошибки при смене языка
    }, [lang, clearErrors]);


    const onSubmit = async (formData) => {
        const newPassword = formData.password; 
        console.log("resetToken:", resetToken);
        console.log("newPassword:", newPassword);
        try {
            await changePassword({ resetToken, newPassword }) // resetToken из URL
            reset()
            setIsSuccess(true)
        } catch (e) {
            toast.error(t('toast.Error changing password. Please try again'))
        }
    }

    return (
        <Stack className={styles.overlay} justify='center' align='center' fullWidth>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack className={styles.container} gap='48' direction='column' fullWidth>
                    
                    {isSuccess ? (
                        <Stack direction='column' align="center" gap="24" fullWidth>
                            <CheckCircleIcon color='text_success' size='70'/>
                            <Text tag="h3" fontStyle="poppins600">
                                {t('form.changePasswordForm.changePasswordSuccess.Password successfully changed!')}
                            </Text>
                            <Text align="center" className={styles.description}>
                                {t('form.changePasswordForm.changePasswordSuccess.You can now log in with your new password')}
                            </Text>
                            <Button fullWidth onClick={() => navigate('/Login')}>
                                {t('Log In')}
                            </Button>
                        </Stack>
                    ):(
                        <>
                            <Stack justify='between' align='end' fullWidth>
                                <Logo/>
                                <LanguageSwitcher/>
                            </Stack>
                            <Stack direction='column'  gap='12'>
                                <Text tag="h2" fontStyle="poppins600">{t('form.changePasswordForm.Change Password')}</Text>
                                <Text className={styles.diskr} align='start'>{t('form.changePasswordForm.Enter a new password to update your current one')}</Text>
                            </Stack>
                            <Stack gap='8' direction='column' fullWidth>
                                <Stack className={styles.container_inputPass} align="center" fullWidth>
                                    <Input 
                                        type={showNewPassword ? 'text' : 'password'} 
                                        label={t("input.label.New Password")} 
                                        placeholder={t("input.placeholder.Your new Password")}
                                        {...register("password", {
                                            required: validMessage[lang].required,
                                            validate: (value) => validatePassword(value, lang) 
                                        })}
                                        error={errors.password} 
                                        required 
                                        fullWidth
                                    />
                                    <button type="button" className={styles.togglePasswordBtn} onClick={toggleNewPassword}>
                                        {showNewPassword ? <EyeIcon color='text_primary'/> : <EyeOffIcon color='text_primary'/>}
                                    </button>
                                </Stack>
                                <Stack  className={styles.container_inputPass} fullWidth>
                                    {/* Повтор пароля */}
                                    <Input
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        label={t("input.label.Confirm password")}
                                        placeholder={t("input.placeholder.Repeat your password")}
                                        {...register("confirmPassword", {
                                        required: validMessage[lang].required,
                                        validate: (value) =>
                                            value === password || validMessage[lang].errors.passwordNotMatch,
                                        })}
                                        error={errors.confirmPassword}
                                        fullWidth
                                        required
                                    />
                                    <button type="button" className={styles.togglePasswordBtn} onClick={toggleConfirmPassword}>
                                        {showConfirmPassword ? <EyeIcon color='text_primary'/> : <EyeOffIcon color='text_primary'/>}
                                    </button>
                                </Stack>
                            </Stack>
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
                            <Stack justify="center" fullWidth>
                                <Text>{t('form.resetPasswordForm.Remember password?')}<Link className={styles.singin_link} to='/login'> {t('form.Log in')}</Link></Text>
                            </Stack>
                        </>
                    )}
                </Stack>
            </form>
        </Stack>
    )
}