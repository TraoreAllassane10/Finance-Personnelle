import Header from "@/Components/Header";
import { Sidebar } from "@/Components/Sidebar";
import ModalTransaction from "@/Components/transaction/ModalTransaction";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen relative bg-gray-200/70">
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
