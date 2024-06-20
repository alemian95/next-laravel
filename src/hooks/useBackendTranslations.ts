import backend from "@/lib/axios";
import { AxiosError } from "axios";
import useSWR, { Fetcher } from "swr";

export const useBackendTranslations = () => {
    
    const fetcher : Fetcher<any, string> = () => {
        return backend.get("/api/settings/translations")
            .then(res => res.data)
            .catch((error: AxiosError) => {
                throw error
            })
    }

    const { data: translations, error, mutate } = useSWR("/api/settings/translations", fetcher)

    const __ = (key : string, params: { [key: string]: string } = {}) : string => {

        if (translations === undefined) {
            return key
        }

        const keys = key.split('.')
        let t = translations

        for (const k of keys) {
            if (t[k] !== undefined) {
                t = t[k]
            }
            else {
                return key
            }
        }

        if (typeof t === 'string') {
            return t.replace(/:([a-zA-Z0-9_]+)/g, (_, k) => params[k] || `:${k}`)
        }

        return key
    }

    return {
        __
    }
}
