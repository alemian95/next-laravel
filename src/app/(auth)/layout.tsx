import { PropsWithChildren } from "react";

export default function AuthLayout({ children } : PropsWithChildren) {

    return (
        <>

            <div className="border rounded-lg my-12 mx-auto p-8 w-full max-w-screen-sm">
                { children }
            </div>

        </>
    )
}