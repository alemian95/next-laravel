import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children } : PropsWithChildren) {

    const t = useTranslations()

    return (
        <>

            <div className="flex justify-center">
                <h1>{ t('guest') }</h1>
            </div>

            <div className="border rounded-lg my-12 mx-auto p-8 w-full max-w-screen-sm">
                { children }
            </div>

        </>
    )
}