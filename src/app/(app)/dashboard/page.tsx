import Link from "next/link"

export const metadata = {
    title: 'Laravel - Dashboard settings',
}

export default function DashboardPage () {

    return (
        <>
            <h1>Dashboard, you are logged in</h1>
            <Link href="/dashboard/settings">Settings</Link>
        </>
    )
}