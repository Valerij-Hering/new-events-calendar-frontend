import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../locales/en/common.json";
import de from "../../locales/de/common.json";
import ru from "../../locales/ru/common.json";

const savedLang = localStorage.getItem("app-language");

i18n
    .use(initReactI18next)
    .init({
        resources: {
        en: { common: en },
        de: { common: de },
        ru: { common: ru },
        },
        lng: savedLang || "en", // 🌍 если есть сохранённый — берём его
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });