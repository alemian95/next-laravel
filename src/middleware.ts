import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
}

export function middleware(_req : NextRequest) {
    return NextResponse.next()
}