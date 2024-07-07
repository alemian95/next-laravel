'use client'

import { useAuth } from "@/hooks/useAuth";
import { useSettings } from "@/hooks/useSettings";
import { PropsWithChildren, useState } from "react";

export default function AppLayout (props : PropsWithChildren) {
    const { user, logout } = useAuth({ middleware: "auth" })
    const { settings } = useSettings()

    const [ sidebarOpen, setSidebarOpen ] = useState(false)
    
    if (! user || ! settings) {
        return "Loading ..."
    }

    return (

        <>
            <div className="flex flex-col h-screen">
                <header className="p-2 bg-primary text-primary-foreground">
                    <div className="flex justify-between items-center">
                        <h1>layout</h1>
                        <button className="block lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}</button>
                    </div>
                </header>
                <div className="flex flex-1">
                    
                    <aside className={`bg-secondary text-secondary-foreground p-4 w-64 transform lg:translate-x-0 transition-transform duration-300 ease-in-out ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } fixed lg:static lg:h-auto h-full flex flex-col items-start justify-between`}>
                        <div>
                            sidebar
                        </div>
                        <div>
                            <div>
                                <button onClick={logout}>LOGOUT</button>
                            </div>
                            <div>
                                <small>&copy; { new Date().getFullYear() } - NextJS</small>
                            </div>
                        </div>
                    </aside>

                    <main className={`flex-1 bg-zinc-50 p-4 transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
                        <pre>{ JSON.stringify(user, null, 2) }</pre>
                        <pre>{ JSON.stringify(settings, null, 2) }</pre>
                        { props.children }
                    </main>
                </div>
            </div>
        </>

    )
}