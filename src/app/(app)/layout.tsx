'use client'

import { useAuth } from "@/hooks/useAuth";
import { PropsWithChildren } from "react";

export default function AppLayout (props : PropsWithChildren) {
    const { user } = useAuth({ middleware: "auth" })

    if (! user) {
        return "Loading ..."
    }

    return (
        <div>
            <h1>layout</h1>

            <pre>{ JSON.stringify(user, null, 2) }</pre>

            { props.children }

        </div>
    )
}