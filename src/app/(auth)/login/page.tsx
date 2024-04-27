'use client'

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Login() {
    const router = useRouter()

    const { login } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/dashboard"
    })

    const [ errors, setErrors ] = useState<{}[]>([])
    const [ status, setStatus ] = useState<string | null>(null)
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
            <form onSubmit={submit}>
                <input type="email" name="email" id="email" className="border" onChange={event => setEmail(event.target.value)} />
                <input type="password" name="password" id="password" className="border" onChange={event => setPassword(event.target.value)} />
                <input type="checkbox" name="remember" id="remember" onChange={event => setRemember(event.target.checked)}/>
                <button type="submit">Login</button>
            </form>

            { pending && "Loading..." }
        </>
    )
}