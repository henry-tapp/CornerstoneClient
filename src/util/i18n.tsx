import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

/**
 * If we use the lazy loading at runtime then we don't need to
 * do all the resource setup below, instead we just need to expose
 * the locale translations on the server in the expected folder which
 * is /public/locales/<locale>/translation.json
 *
 * We may want to eventually bundle in the translations, however keeping
 * them separate from the build and loading lazily means we can do similar
 * to the themes and keep them in a separate repo even (if we wanted).
 */

// import translationsEn from "../../public/locales/en/translation.json";

// const resources = {
//   en: {
//     translation: translationsEn,
//   },
// };

i18next
  .use(LanguageDetector)
  .use(backend)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    // resources: resources,
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18next;
