'use client'

import { useAuth } from "@/hooks/useAuth"
import { useTranslations } from "@/hooks/useTranslations"
import { useState } from "react"

export default function VerifyEmail() {

    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState<string|null>(null)

    const { __ } = useTranslations()

    return (
        <>
            <div>{ __('passwords.not_verified') }</div>
            
            { status === 'verification-link-sent' && (
                <div>{ __('passwords.sent') }</div>
            )}

            <div>
                <button onClick={() => resendEmailVerification({ setStatus })}>{ __('passwords.resend_verification_email') }</button>

                <button onClick={logout}>{ __('auth.logout') }</button>
            </div>
        </>
    )
}