'use client'

import { useAuth } from "@/hooks/useAuth";
import { useSettings } from "@/hooks/useSettings";
import { PropsWithChildren } from "react";

export default function AppLayout (props : PropsWithChildren) {
    const { user, logout } = useAuth({ middleware: "auth" })
    const { settings } = useSettings()

    if (! user || ! settings) {
        return "Loading ..."
    }

    return (
        <div>
            <h1>layout</h1>

            <pre>{ JSON.stringify(user, null, 2) }</pre>
            <pre>{ JSON.stringify(settings, null, 2) }</pre>

            <button onClick={logout}>LOGOUT</button>

            { props.children }

        </div>
    )
}