'use client'

import { errorsType, useAuth } from "@/hooks/useAuth"
import { useTranslations } from "next-intl"
import { FormEvent, useState } from "react"

export default function Register() {

    const { register } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/dashboard"
    })

    const t = useTranslations()

    const [ errors, setErrors ] = useState<errorsType>({})
    const [ pending, setPending ] = useState<boolean>(false)
    
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("")

    async function submit (event : FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setPending(true)
        await register(name, email, password, passwordConfirmation, setErrors)
        setPending(false)
    }

    return (
        <>
            <form onSubmit={submit} className="flex flex-col gap-4 items-center">
                { errors.name && <span className="text-red-600">{ errors.name }</span> }
                <input placeholder={t('form.register.name')} type="text" name="name" id="name" className="border rounded-md p-2 w-full" onChange={event => setName(event.target.value)} />
                { errors.email && <span className="text-red-600">{ errors.email }</span> }
                <input type="email" name="email" id="email" className="border rounded-md p-2 w-full" onChange={event => setEmail(event.target.value)} />
                { errors.password && <span className="text-red-600">{ errors.password }</span> }
                <input type="password" name="password" id="password" className="border rounded-md p-2 w-full" onChange={event => setPassword(event.target.value)} />
                { errors.passwordConfirmation && <span className="text-red-600">{ errors.passwordConfirmation }</span> }
                <input type="password" name="passwordConfirmation" id="passwordConfirmation" className="border rounded-md p-2 w-full" onChange={event => setPasswordConfirmation(event.target.value)} />
                <button type="submit" className="border bg-black text-white uppercase w-fit px-3 py-1 rounded-md" >Register</button>
            </form>

            { pending && "Loading..." }
        </>
    )
}