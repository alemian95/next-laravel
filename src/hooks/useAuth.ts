import axios from "@/lib/axios"
import { User } from "@/models/User"
import { AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect } from "react"
import useSWR, { Fetcher } from "swr"

type useAuthProps = {
    middleware? : "guest" | "auth",
    redirectIfAuthenticated? : string
}
type setErrorsType = Dispatch<SetStateAction<{}[]>>
type setStatusType = Dispatch<SetStateAction<string | null>>

export const useAuth = ({ middleware, redirectIfAuthenticated } : useAuthProps = {}) => {

    const router = useRouter()
    const params = useParams()

    const fetcher : Fetcher<User, string> = () => {
        return axios.get("/api/user")
            .then(res => res.data)
            .catch((error: AxiosError) => {
                if (error.response?.status !== 409) throw error
                router.push("/verify-email")
            })
    }

    const { data: user, error, mutate } = useSWR("/api/user", fetcher)

    const csrf = () => axios.get("/sanctum/csrf-cookie")

    const register = async ({ setErrors, ...props } : { setErrors : setErrorsType }) => {
        await csrf()

        setErrors([])

        axios.post("/register", props)
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

        setErrors([])
        setStatus(null)

        axios
            .post('/login', { email, password, remember })
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email } : { setErrors : setErrorsType, setStatus : setStatusType, email : string }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props } : { setErrors: setErrorsType, setStatus: setStatusType }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
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
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
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