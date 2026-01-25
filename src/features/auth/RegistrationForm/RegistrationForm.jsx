import { Stack } from '../../../shared/ui/Stack/Stack';
import { Text } from "../../../shared/ui/Text/Text";
import styles from './RegistrationForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { textRegex, emailRegex, validatePassword, validMessage } from '../../../shared/lib/validation';
import { useRegistrationMutation } from '../api/userApi';
import { useResize } from '../../../shared/hooks/useResize';
import { Button } from "@/shared/ui/Button/Button";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../../widgets/LanguageSwitcher/ui/LanguageSwitcher';
import { CheckCircleIcon, EyeIcon, EyeOffIcon } from '../../../assets/svg/Icons';
import { useEffect } from 'react';
import { useBoolean } from '../../../shared/hooks/useBoolean';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { useState } from 'react';
import { Logo } from '../../../shared/ui/Logo/Logo';



export const RegistrationForm = () => {

    const methods = useForm({
        mode: "all", //onSubmit, onBlur, onChange, onTouched, all
        defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        termsAccepted: false,
        }
    });

    const { register, handleSubmit, watch, reset, formState: { errors } } = methods;
    const termsAccepted = watch("termsAccepted");
    const [signup, { isLoading }] = useRegistrationMutation();
    const { value: showPassword, toggle: togglePassword } = useBoolean(false);
    const { isMobile } = useResize();
    const { t, i18n } = useTranslation("common");
    const lang = i18n.language;
    const { clearErrors } = methods; // методы формы
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");

    console.log(location.state?.email)

    useEffect(() => {
        clearErrors(); // удаляет все ошибки при смене языка
    }, [i18n.language, clearErrors]);

    const onSubmit = async (formData) => {
    
        try {
            console.log('Sending registration data:', formData); // Логируем отправленные данные
            await signup(formData).unwrap(); // если успешно — без ошибок
            setRegisteredEmail(formData.email); 
            reset(); // очищаем форму
            setIsSuccess(true)
        } catch (error) {
            console.error('Error during signup:', error); // Логируем ошибку
            if (error?.status === 500 || error?.originalStatus === 500) {
                toast.error (t("toast.Server is unavailable. Please try again later"));
            } else if (
                (error?.status === 400 || error?.status === 401) ||
                (error?.originalStatus === 400 || error?.originalStatus === 401) ||
                (error?.status === 'PARSING_ERROR' && error?.originalStatus === 400)
            ) {
                toast.error (t("A user with this email already exists"));
            } else {
                toast.error (t("toast.An error occurred. Please try again"));
            }
        }
    };

    return (
        <Stack className={styles.overlay} justify='center' align='center' fullWidth>
            {isSuccess ? (
                        <Stack className={styles.containerSuccess}  fullWidth justify='center' align='center'>
                            <Stack className={styles.subcontainerSuccess} direction='column' align="center" gap="24" fullWidth>
                                <CheckCircleIcon color='text_success' size='70'/>
                                <Text tag="h3" fontStyle="poppins600">
                                    {t('form.registrationForm.registrationSuccess.Registration Successful!')}
                                </Text>
                                <Text align='center'>
                                    {t("form.registrationForm.registrationSuccess.Congratulations, you have successfully registered on our website.")}
                                </Text>
                                <Button onClick={() => navigate('/login')}>
                                    {t('button.Go to Login')}
                                </Button>
                            </Stack>
                        </Stack>
                    ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack className={styles.container_signup} gap='32' direction='column' fullWidth>
                    <Stack justify='between' align='end' fullWidth>
                        <Logo/>
                        <LanguageSwitcher/>
                    </Stack>
                    <Stack direction='column'  gap='8'>
                        <Text tag="h2" fontStyle="poppins600">{t('form.Sign Up')}</Text>
                        <Text className={styles.diskr} fontStyle="poppins300">{t('form.registrationForm.Fill your information below or register with your social account')}</Text>
                    </Stack>
                    <Stack direction='column' gap='12' fullWidth>
                        <Stack gap='12' direction={isMobile ? 'column' : 'row'} fullWidth>
                            <Input 
                                label={t("input.label.First Name")}
                                placeholder={t("input.placeholder.Ex. John")}
                                {...register("firstName", {
                                    required: validMessage[lang].required,
                                    pattern: { 
                                    value: textRegex, 
                                    message: validMessage[lang].errors.validName 
                                }
                                })}
                                required 
                                fullWidth
                                error={errors.firstName}
                            />
                            <Input 
                                label={t("input.label.Last Name")}
                                placeholder={t("input.placeholder.Ex. Doe")}
                                {...register("lastName", {
                                    required: validMessage[lang].required,
                                    pattern: {
                                    value: textRegex,
                                    message: validMessage[lang].errors.validName
                                }
                                })}
                                required 
                                fullWidth
                                error={errors.lastName}
                            />
                        </Stack>
                        <Input 
                            type='email' 
                            label={t("input.label.Email")}
                            placeholder={t("input.placeholder.name@example.com")}
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
                                    validate: (value) => validatePassword(value, lang) 
                                })}
                                required 
                                fullWidth
                                error={errors.password} 
                            />
                            <button type="button" className={styles.togglePasswordBtn} onClick={togglePassword}>
                                {showPassword ? <EyeIcon color='text_primary'/> : <EyeOffIcon color='text_primary'/>}
                            </button>
                        </Stack>
                    </Stack>
                    <Stack gap='12' align='center' fullWidth>
                        <Input type="checkbox" {...register("termsAccepted", { required: validMessage[lang].required })} required error={errors.termsAccepted}/>
                        <Text align='start'>
                            {t('form.registrationForm.Agree with')} <Link className={styles.rules}>{t('form.registrationForm.Teams & Condition')}</Link> {t('form.registrationForm.and')} <Link className={styles.rules}>{t('form.registrationForm.Privacy Policy')}</Link>
                        </Text>
                    </Stack>
                    <Button type="submit" disabled={isLoading} fullWidth>
                        {isLoading ? (
                            <Stack direction="row" align="center" justify="center" gap="8">
                                <Loader color='text_inverse' strokeWidth="7" size="18"/>
                                <Text color='text-inverse' tag="span"> {t("button.Signing up...")}</Text>
                            </Stack>
                        ) : (
                            t("button.Sign Up")
                        )}
                    </Button>
                    <Stack justify="center" fullWidth>
                        <Text>
                            {t('form.registrationForm.Allready have an Account?')} <Link to="/login" className={styles.login_link}>{t('form.Log in')}</Link>
                        </Text>
                    </Stack>
                </Stack>
            </form>
            )}
        </Stack>
    )
}