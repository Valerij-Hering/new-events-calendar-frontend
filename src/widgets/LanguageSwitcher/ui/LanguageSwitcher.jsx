import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import FlagRuIcon from "../../../assets/images/flags/flagRuIcon.svg";
import FlagUsIcon from "../../../assets/images/flags/flagUsIcon.svg";
import FlagDeIcon from "../../../assets/images/flags/flagDeIcon.svg";
import styles from "./LanguageSwitcher.module.scss";
import { ArrowIcon } from "../../../assets/svg/ArrowIcon";
import { useResize } from "../../../shared/hooks/useResize";
import { useBoolean } from "../../../shared/hooks/useBoolean";
import { CheckIcon } from '../../../assets/svg/CheckIcon';


const LanguageSwitcher = ({ size = 22 }) => {

    const { value: isOpen, toggle, setFalse: close } = useBoolean(false);
    const { t, i18n } = useTranslation("common");
    const ref = useRef(null);
    const { isMobile } = useResize();

    useEffect(() => {
        const updateStorage = (lng) => localStorage.setItem("app-language", lng);
        i18n.on("languageChanged", updateStorage);

        return () => i18n.off("languageChanged", updateStorage);
    }, []);

    const flagComponents = {
    ru: <img src={FlagRuIcon} alt="RU" width={size} />,
    en: <img src={FlagUsIcon} alt="EN" width={size} />,
    de: <img src={FlagDeIcon} alt="DE" width={size} />,
};

    const changeLanguage = (lng) => { 
        i18n.changeLanguage(lng);
        localStorage.setItem("app-language", lng);
        document.body.classList.remove("lang-en", "lang-ru", "lang-de");
        document.body.classList.add(`lang-${lng}`);
        close();
    };

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
        <Stack className={styles.languageContainer} ref={ref}>
            {isOpen && (
                <Stack  className={styles.languageModal} direction="column">
                    <Stack className={styles.language} justify="between" align="center" fullWidth onClick={() => {changeLanguage("en")}}>
                        <Stack align="center" gap="8">
                            <img src={FlagUsIcon} alt="EN" width={20} />
                            <Text tag="span" color="blackSoft" size={13}>{t("languages.en")}</Text>
                        </Stack>
                        {i18n.language === 'en' && <CheckIcon className={styles.checkIcon} color="blue" size={16}/>}
                    </Stack>

                    <Stack className={styles.language} justify="between" align="center" fullWidth onClick={() => {changeLanguage("de")}}>
                        <Stack align="center" gap="8">
                            <img src={FlagDeIcon} alt="EN" width={20} />
                            <Text tag="span" color="blackSoft" size={13}>{t("languages.de")}</Text>
                        </Stack>
                        {i18n.language === 'de' && <CheckIcon className={styles.checkIcon} color="blue" size={16}/>}
                    </Stack>

                    <Stack className={styles.language} justify="between" align="center" fullWidth onClick={() => {changeLanguage("ru")}}>
                        <Stack align="center" gap="8">
                            <img src={FlagRuIcon} alt="EN" width={20} />
                            <Text tag="span" color="blackSoft" size={13}>{t("languages.ru")}</Text>
                        </Stack>
                        {i18n.language === 'ru' && <CheckIcon className={styles.checkIcon} color="blue" size={16}/>}
                    </Stack>
                </Stack>
            )}
            <Stack className={styles.languageChange_btn} gap="4" onClick={toggle} align="center">
                {flagComponents[i18n.language] || <img src={FlagUsIcon} alt="EN" width={22} />}
                <ArrowIcon color="text-primary"/>
            </Stack>
        </Stack>
    );
};

export default LanguageSwitcher;
