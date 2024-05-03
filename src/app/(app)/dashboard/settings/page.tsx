import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

export const metadata = {
    title: 'Laravel - Dashboard settings',
}

export default function DashboardSettingsPage () {

    return (
        <>
            <h1>Dashboard settings, you are logged in</h1>
            <Link href="/dashboard">Back</Link>
        </>
    )
}