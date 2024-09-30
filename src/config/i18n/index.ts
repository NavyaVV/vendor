import { memoize } from "lodash";
import I18n, { Scope, TranslateOptions } from "i18n-js";
import { findBestAvailableLanguage } from "react-native-localize";
import { I18nManager } from "react-native";
import moment from "moment";

const translationGetters: any = {
  en: () => require("./en.json"),
};

const setLanguage = (languageTag: string, callback: (lang: string) => void) => {
  I18n.translations = { [languageTag]: translationGetters[languageTag]() };
  I18n.locale = languageTag;
  if (I18n.locale.indexOf("ml") === 0) {
    moment.locale("en");
    callback("en");
  } else {
    moment.locale("en");
    callback("en");
  }
};

export const setI18nConfig = (
  callback: (lang: string) => void,
  lang?: string
): void => {
  if (lang) {
    const languageTag = lang;

    translate.cache.clear();

    I18nManager.forceRTL(false);

    setLanguage(languageTag, callback);
  } else {
    const fallback = { languageTag: "en", isRTL: false };

    const { languageTag, isRTL } =
      findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

    translate.cache.clear();

    I18nManager.forceRTL(isRTL);

    setLanguage(languageTag, callback);
  }
};

const translate: any = memoize(
  (key: Scope, config: TranslateOptions) => I18n.t(key, config),
  (key: Scope, config: any) => (config ? key + JSON.stringify(config) : key)
);

export default translate;
