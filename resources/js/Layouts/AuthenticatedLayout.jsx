import Header from "@/Components/Header";
import { Sidebar } from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen relative bg-gray-100">
            <Sidebar />
            <main className="lg:ml-[16.666667%]">
                <Header />

                <div className="px-8 py-10">{children}</div>
            </main>
        </div>
    );
}
