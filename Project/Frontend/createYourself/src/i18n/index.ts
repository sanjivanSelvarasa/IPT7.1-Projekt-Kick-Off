import {createI18n} from "vue-i18n";
import landingpageDe from "./landingpage/de.json"
import landingpageEn from "./landingpage/en.json"

import dashboardDe from "./dashboard/de.json"
import dashboardEn from "./dashboard/en.json"

import cardDashboardDe from "./carddashboard/de.json"
import cardDashboardEn from "./carddashboard/en.json"

import footerDe from "./footer/de.json"
import footerEn from "./footer/en.json"

import loginDe from "./loginpage/de.json"
import loginEn from "./loginpage/en.json"

import navDe from "./nav/de.json"
import navEn from "./nav/en.json"

import registerDe from "./registerpage/de.json"
import registerEn from "./registerpage/en.json"


const savedLang = localStorage.getItem("lang") ?? (navigator.language === ('de' || 'en') ? navigator.language : "de");

export const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  fallbackLocale: "de",
  messages: {
    de: {
      landingpage: landingpageDe,
      cardDashboard: cardDashboardDe,
      dashboard: dashboardDe,
      footer: footerDe,
      login: loginDe,
      navHome: navDe,
      register: registerDe,
    },
    en: {
      landingpage: landingpageEn,
      cardDashboard: cardDashboardEn,
      dashboard: dashboardEn,
      footer: footerEn,
      login: loginEn,
      navHome: navEn,
      register: registerEn,
    },
  }
});
