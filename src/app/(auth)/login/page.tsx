'use client'

import { errorsType, useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Login() {
    const router = useRouter()

    const { login } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/dashboard"
    })

    const [ errors, setErrors ] = useState<errorsType>({})
    const [ _status, setStatus ] = useState<string | null>(null)
    const [ pending, setPending ] = useState<boolean>(false)
    
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ remember, setRemember ] = useState(false)

    async function submit (event : FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setPending(true)
        await login(email, password, remember, setErrors, setStatus)
        setPending(false)
    }

    return (
        <>
            <form onSubmit={submit} className="flex flex-col gap-4 items-center">
                { errors.email && <span className="text-red-600">{ errors.email }</span> }
                <input type="email" name="email" id="email" className="border rounded-md p-2 w-full" onChange={event => setEmail(event.target.value)} />
                { errors.password && <span className="text-red-600">{ errors.password }</span> }
                <input type="password" name="password" id="password" className="border rounded-md p-2 w-full" onChange={event => setPassword(event.target.value)} />
                <input type="checkbox" name="remember" id="remember" className="border rounded-md w-fit" onChange={event => setRemember(event.target.checked)}/>
                <button type="submit" className="border bg-black text-white uppercase w-fit px-3 py-1 rounded-md" >Login</button>
            </form>

            { pending && "Loading..." }
        </>
    )
}