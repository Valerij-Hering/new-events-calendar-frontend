import { Stack } from '@/shared/ui/Stack/Stack';
import { Text } from "@/shared/ui/Text/Text";
import styles from './LoginForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useLoginMutation } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '../../../assets/svg/Icons';
import { Button } from '../../../shared/ui/Button/Button';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from '../../../widgets/LanguageSwitcher/ui/LanguageSwitcher';
import { emailRegex, validMessage } from '../../../shared/lib/validation';
import { useEffect } from 'react';
import { useBoolean } from '../../../shared/hooks/useBoolean';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { Logo } from '../../../shared/ui/Logo/Logo';




export const LoginForm = () => {

    const methods = useForm({
        mode: "onChange", //onSubmit, onBlur, onChange, onTouched, all
        defaultValues: {
        email: "",
        password: "",
        }
        });

        const { register, reset, handleSubmit, formState: { errors } } = methods;
        const [signin, { isLoading }] = useLoginMutation();
        const { login } = useAuth();
        const navigate = useNavigate();
        const { value: showPassword, toggle: togglePassword } = useBoolean(false);
        const { t, i18n } = useTranslation("common");
        const lang = i18n.language;
        const { clearErrors } = methods; // методы формы

        
        useEffect(() => {
            clearErrors(); // удаляет все ошибки при смене языка
        }, [i18n.language, clearErrors]);


        const onSubmit = async (data) => {
            try {
                const response = await signin(data).unwrap(); // unwrap выбрасывает ошибку при статусе 4xx/5xx
                login(response.accessToken, response.refreshToken, response.user);
                navigate('/')
                reset()
            } catch (error) {
                if (error?.status === 500 || error?.originalStatus === 500) {
                    toast.error(t("toast.Server is unavailable. Please try again later"));
                } else if (
                    (error?.status === 400 || error?.status === 401) ||
                    (error?.originalStatus === 400 || error?.originalStatus === 401) ||
                    (error?.status === 'PARSING_ERROR' && error?.originalStatus === 400)
                ) {
                    // 400 или 401 для неверного логина/пароля
                    toast.error(t("toast.Invalid email or password"));
                } else {
                    toast.error(t("toast.An error occurred. Please try again"));
                }
                console.log(error)
            }
        };


    return (
        <Stack className={styles.overlay} justify='center' align='center' fullWidth>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack className={styles.container_login} gap='32' direction='column' fullWidth>
                        <Stack justify='between' align='end' fullWidth>
                            <Logo/>
                            <LanguageSwitcher/>
                        </Stack>
                        <br/>
                    <Stack direction='column'  gap='12'>
                        <Text tag="h2" fontStyle="poppins600">{t('form.Log In')}</Text>
                        <Text className={styles.diskr} align='start' fontStyle="poppins300">{t('form.loginForm.Please fill your detail to access your account')}</Text>
                    </Stack>
                    <Stack gap='12' direction='column' fullWidth>
                        <Input 
                            type='email' 
                            label={t("input.label.Email")} 
                            placeholder={t("input.placeholder.Your Email")} {...register("email")}
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
                        <Stack className={styles.container_inputPass} align="center" fullWidth>
                            <Input 
                                type={showPassword ? 'text' : 'password'} 
                                label={t("input.label.Password")} 
                                placeholder={t("input.placeholder.Your Password")} 
                                {...register("password", {
                                    required: validMessage[lang].required,
                                })}
                                error={errors.password} 
                                required 
                                fullWidth
                            />
                            <button
                                type="button"
                                className={styles.togglePasswordBtn}
                                onClick={togglePassword}
                            >
                                {showPassword ? <EyeIcon color='text_primary'/> : <EyeOffIcon color='text_primary'/>}
                            </button>
                        </Stack>
                    </Stack>
                    <Stack justify="between" align="center" fullWidth>
                        <Link to="/reset-password" className={styles.fogPass_link}>
                        <Text>{t('form.loginForm.Forgot Password?')}</Text>
                        </Link>
                    </Stack>
                    <Button type="submit" disabled={isLoading} fullWidth>
                        {isLoading ? (
                            <Stack direction="row" align="center" justify="center" gap="8">
                                <Loader color='text_inverse' strokeWidth="7" size="18"/>
                                <Text color='text-inverse' tag="span"> {t("button.Loging in...")}</Text>
                            </Stack>
                        ) : (
                            t("button.Log In")
                        )}
                    </Button>
                    <Stack justify='center' fullWidth>
                        <Text>{t("form.loginForm.Don't have an account?")} <Link to='/registration' className={styles.singup_link}>{t('form.Sign up')}</Link></Text>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    )
}