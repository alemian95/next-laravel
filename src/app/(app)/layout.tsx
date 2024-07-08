'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
            <div className="flex flex-col h-screen bg-zinc-50">
                <header className="p-2 bg-primary text-primary-foreground">
                    <div className="flex justify-between items-center">
                        <h1>layout</h1>
                        <button className="block lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}</button>
                    </div>
                </header>
                <div className="flex flex-1">
                    
                    <aside className={`bg-secondary text-secondary-foreground p-4 w-full lg:w-64 transform lg:translate-x-0 transition-transform duration-300 ease-in-out ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } fixed top-0 lg:static h-full flex flex-col items-start justify-between`}>
                        <div className="w-full flex items-center justify-between">
                            <h1>sidebar</h1>
                            <button className="block lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}</button>
                        </div>
                        <div>
                            <div>
                                <Button variant="destructive" onClick={logout}>LOGOUT</Button>
                            </div>
                            <div>
                                <small>&copy; { new Date().getFullYear() } - NextJS</small>
                            </div>
                        </div>
                    </aside>

                    <main className={`flex-1 p-4 transition-all duration-300 ease-in-out `}>
                        <Card>
                            <CardHeader>
                                <h1>Dashboard</h1>
                            </CardHeader>
                            <CardContent>
                                { props.children }
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </>

    )
}