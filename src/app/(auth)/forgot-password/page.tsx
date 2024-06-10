'use client'

import { errorsType, useAuth } from "@/hooks/useAuth"
import { useTranslations } from "@/hooks/useTranslations"
import { FormEvent, useState } from "react"

export default function ForgotPassword() {

    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard'
    })

    const [ email, setEmail ] = useState('')
    const [ errors, setErrors ] = useState<errorsType>({})
    const [ status, setStatus] = useState<string|null>(null)

    const submitForm = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        forgotPassword({ email, setErrors, setStatus})
    }

    const { __ } = useTranslations()

    return (
        <>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="email">Email</label>
                    { errors.email && <span className="text-red-600">{errors.email}</span> }
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                </div>
                <div>
                    <button>{ __('passwords.forgot_submit_form') }</button>
                </div>
            </form>
        </>
    )
}