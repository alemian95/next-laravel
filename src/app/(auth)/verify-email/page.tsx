'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function VerifyEmail() {

    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const t = useTranslations()

    const [status, setStatus] = useState<string|null>(null)

    return (
        <>
            <div>{ t('passwords.not_verified') }</div>
            
            { status === 'verification-link-sent' && (
                <div>{ t('passwords.sent') }</div>
            )}

            <div>
                <Button onClick={() => resendEmailVerification({ setStatus })}>{ t('passwords.resend_verification_email') }</Button>

                <Button onClick={logout}>{ t('auth.logout') }</Button>
            </div>
        </>
    )
}