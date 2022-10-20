import i18n from 'i18next';
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    .use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        backend: {
            loadPath: '/{{ns}}/{{lng}}.json'
        },
        fallbackLng: 'en',
        debug: false,
        ns: "translations",
        interpolation: {
            escapeValue: false,
            formatSeparator: ',',
        },


    });
export default i18n;