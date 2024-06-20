import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import acceptLanguage from 'accept-language'

export default getRequestConfig(async () => {

  acceptLanguage.languages(languages)

  let lang
  if (cookies().has(cookieName)) {
    lang = acceptLanguage.get(cookies().get(cookieName)?.value)
  }
  if (! lang) {
    lang = acceptLanguage.get(headers().get('Accept-Language'))
  }
  if (! lang) {
    lang = fallbackLng
  }

  const locale = lang;

  return {
    locale,
    messages: {
      ...(await import(`../locales/${locale}/common.json`)).default,
      ...(await import(`../locales/${locale}/forms.json`)).default,
    }
  };
});


export const fallbackLng = 'en'
export const languages = [fallbackLng, 'it']
export const cookieName = 'i18next'