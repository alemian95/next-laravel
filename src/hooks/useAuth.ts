import backend from "@/lib/axios"
import csrf from "@/lib/csrf"
import { User } from "@/models/User"
import { AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect } from "react"
import useSWR, { Fetcher } from "swr"

type useAuthProps = {
    middleware? : "guest" | "auth",
    redirectIfAuthenticated? : string
}
type setErrorsType = Dispatch<SetStateAction<errorsType>>
type setStatusType = Dispatch<SetStateAction<string | null>>

export type errorsType = {
    name? : string,
    email? : string,
    password? : string,
    passwordConfirmation?: string,
}

export const useAuth = ({ middleware, redirectIfAuthenticated } : useAuthProps = {}) => {

    const router = useRouter()
    const params = useParams()

    const fetcher : Fetcher<User, string> = () => {
        return backend.get("/api/user")
            .then(res => res.data)
            .catch((error: AxiosError) => {
                if (error.response?.status !== 409) throw error
                router.push("/verify-email")
            })
    }

    const { data: user, error, mutate } = useSWR("/api/user", fetcher)

    const register = async (
        name : string,
        email : string,
        password : string,
        passwordConfirmation : string,
        setErrors : setErrorsType
    ) => {
        await csrf()

        setErrors({})

        backend.post("/register", { name, email, password, password_confirmation: passwordConfirmation })
            .then(() => mutate())
            .catch((error) => {
                if (error.response?.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async (
        email : string, 
        password : string,
        remember : boolean,
        setErrors : setErrorsType,
        setStatus : setStatusType
    ) => {
        await csrf()

        setErrors({})
        setStatus(null)

        backend
            .post('/login', { email, password, remember })
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email } : { setErrors : setErrorsType, setStatus : setStatusType, email : string }) => {
        await csrf()

        setErrors({})
        setStatus(null)

        backend
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props } : { setErrors: setErrorsType, setStatus: setStatusType }) => {
        await csrf()

        setErrors({})
        setStatus(null)

        backend
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus } : { setStatus : setStatusType }) => {
        backend
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await backend.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }



    useEffect(() => {
        
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }

        if (window.location.pathname === "/verify-email" && user?.email_verified_at) {
            router.push(redirectIfAuthenticated!)
        }

        if (middleware === 'auth' && error) {
            logout()
        }
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }

}