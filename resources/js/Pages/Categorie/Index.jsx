import AddCategorieModal from "@/Components/categorie/AddCategorieModal";
import CategorieDepense from "@/Components/categorie/CategorieDepense";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator"
import CategorieRevenu from "@/Components/categorie/CategorieRevenu";

const Index = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Catégories" />

            {/* Modal d'ajout d'une catégorie */}
            {openModal && <AddCategorieModal setOpenModal={setOpenModal} />}

            <section className="flex justify-between place-items-center mb-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold">
                        Catégories
                    </h2>
                    <p className="text-sm text-muted-foreground">
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

            <Tabs defaultValue="depense" className="w-full">
                <TabsList>
                    <TabsTrigger value="depense">
                        Catégories dépense
                    </TabsTrigger>
                    <TabsTrigger value="revenu">Catégories Revenu</TabsTrigger>
                </TabsList>
               
                <Separator className='my-2' />

                <TabsContent value="depense">
                    <CategorieDepense setOpenModal={setOpenModal} />
                </TabsContent>
                <TabsContent value="revenu">
                    <CategorieRevenu setOpenModal={setOpenModal} />
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
};

export default Index;
