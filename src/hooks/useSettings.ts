import backend from "@/lib/axios"
import { AxiosError } from "axios"
import useSWR, { Fetcher } from "swr"

export const useSettings = () => {

    const fetcher : Fetcher<any, string> = () => {
        return backend.get("/api/settings")
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