'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { errorsType, useAuth } from '@/hooks/useAuth'

const PasswordReset = () => {
    const searchParams = useSearchParams()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [ errors, setErrors ] = useState<errorsType>({})
    const [ status, setStatus] = useState<string|null>(null)

    const submitForm = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(searchParams.get('email')!)
    }, [searchParams.get('email')])

    return (
        <>
            <form onSubmit={submitForm}>

                { JSON.stringify({email, password, passwordConfirmation}, null, 2) }
                
                <div>
                    <label htmlFor="email">Email</label>

                    { errors.email && <span className="text-red-500">{errors.email}</span> }

                    <input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoFocus
                    />

                </div>

                <div className="mt-4">
                    <label htmlFor="password">Password</label>

                     { errors.password && <span className="text-red-500">{errors.password}</span> }

                    <input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                </div>

                <div className="mt-4">
                    <label htmlFor="passwordConfirmation">
                        Confirm Password
                    </label>

                    { errors.passwordConfirmation && <span className="text-red-500">{errors.passwordConfirmation}</span> }

                    <input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        className="block mt-1 w-full"
                        onChange={e => setPasswordConfirmation(e.target.value) }
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button>Reset Password</button>
                </div>
            </form>
        </>
    )
}

export default PasswordReset