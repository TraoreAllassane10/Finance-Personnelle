import AddCategorieModal from "@/Components/categorie/AddCategorieModal";
import CategorieDepense from "@/Components/categorie/CategorieDepense";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const Index = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Catégories" />

            {/* Modal d'ajout d'une catégorie */}
            {openModal && <AddCategorieModal setOpenModal={setOpenModal} />}

            <section className="flex justify-between place-items-center mb-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl text-slate-900 font-bold">
                        Catégories
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Gérer vos catégories de revenus et de dépense
                    </p>
                </div>

                <Button
                    onClick={() => setOpenModal(true)}
                    className="bg-blue-600 text-white text-sm rounded-md px-2 py-2 hover:bg-blue-800 transition duration-300 flex gap-2 place-items-center"
                >
                    <Plus className="text-white" size={16} />
                    Ajouter une catégorie
                </Button>
            </section>

            <section>
                <h1 className="text-md text-muted-foreground font-medium">
                    Catégories de depense
                </h1>
                <hr className="w-full border-1 border-gray-200 mt-2 mb-4" />
                <CategorieDepense setOpenModal={setOpenModal} />
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;
