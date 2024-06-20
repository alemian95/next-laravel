import { NextRequest, NextResponse } from "next/server";
// import { cookieName, languages } from "./i18n";
// import { cookieName, fallbackLng, languages } from "./i18n";
// import acceptLanguage from 'accept-language'

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
}

export function middleware(_req : NextRequest) {
    // acceptLanguage.languages(languages)
    // let lang
    // if (req.cookies.has(cookieName)) {
    //     lang = acceptLanguage.get(req.cookies.get(cookieName)?.value)
    // }
    // if (! lang) {
    //     lang = acceptLanguage.get(req.headers.get('Accept-Language'))
    // }
    // if (! lang || ! languages.includes(lang)) {
    //     lang = fallbackLng
    // }

    return NextResponse.next()
}