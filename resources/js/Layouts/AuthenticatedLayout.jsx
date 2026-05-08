import { Nav } from "@/Components/Nav";
import { usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen relative bg-gray-100">
            <Nav />
            <main className="lg:ml-[16.666667%] p-10">{children}</main>
        </div>
    );
}
