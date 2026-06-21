import Header from "@/Components/Header";
import { Sidebar } from "@/Components/Sidebar";
import ModalTransaction from "@/Components/transaction/ModalTransaction";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen relative bg-gray-100">
            <Sidebar />

            {/* Modal d'ajout et de modification de transaction */}
            {open && <ModalTransaction typeModal="ajout" setOpenModal={setOpen} />}

            <main className="lg:ml-[224px]">
                <Header setOpenModal={setOpen} />

                <div className="px-8 py-10">{children}</div>
            </main>
        </div>
    );
}
