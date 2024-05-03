import axios from "@/lib/axios"
import { AxiosError } from "axios"
// import { useParams, useRouter } from "next/navigation"
import useSWR, { Fetcher } from "swr"

export const useSettings = () => {

    // const router = useRouter()
    // const params = useParams()

    const fetcher : Fetcher<any, string> = () => {
        return axios.get("/api/settings")
            .then(res => res.data)
            .catch((error: AxiosError) => {
                throw error
            })
    }

    const { data: settings, error, mutate } = useSWR("/api/settings", fetcher)

    return {
        settings
    }
}