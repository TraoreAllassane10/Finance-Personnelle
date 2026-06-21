import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { TableTransaction } from "@/Components/transaction/TableTransaction";
import { TableTransactionNotFound } from "@/Components/transaction/TableTransactionNotFound";
import ModalTransactionUpdate from "@/Components/transaction/ModalTransactionUpdate";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Search, X } from "lucide-react";
import { Input } from "@/Components/ui/input";

const Depense = () => {
    const { depenses, categories } = usePage().props;
    const [updateTransactionId, setUpdateTransactionId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [categorieSearch, setCategorieSearch] = useState("");
    const [monthSearch, setMonthSearch] = useState("");

    const canSearch = monthSearch || categorieSearch;

    const handleSearch = async () => {
        try {
            router.get("/depenses", {
                categorie: categorieSearch,
                date: monthSearch,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const resetFiltrer = () => {
        setCategorieSearch("");
        setMonthSearch("");

        router.visit("depenses");
    };

    return (
        <div>
            <AuthenticatedLayout>
                <Head title="Depenses" />

                {/* Modal de modification d'une transaction */}
                {openModal && (
                    <ModalTransactionUpdate
                        updateTransactionId={updateTransactionId}
                        setOpenModal={setOpenModal}
                    />
                )}

                {/* Entete de la page */}
                <section className="mb-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold">Dépenses</h1>
                        <p className="text-sm text-muted-foreground">
                            Gérer et suivez vos dépenses.
                        </p>
                    </div>
                </section>

                {/* Section de filtre */}
                <Card className="mb-4 px-5 py-3.5 border border-border/60 shadow-none rounded-xl">
                    <div className="flex flex-wrap items-center gap-2">
                        <Input
                            type="month"
                            value={monthSearch}
                            onChange={(e) => setMonthSearch(e.target.value)}
                            className="w-auto text-sm h-8 border-border/60 focus-visible:ring-1"
                        />

                        <select
                            value={categorieSearch}
                            onChange={(e) => setCategorieSearch(e.target.value)}
                            className="h-8 rounded-md border border-border/60 bg-background text-sm text-foreground px-3 pr-8 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring appearance-none cursor-pointer"
                        >
                            <option value="tout">Toutes les catégories</option>
                            {categories.map((categorie) => (
                                <option key={categorie.id} value={categorie.id}>
                                    {categorie.nom}
                                </option>
                            ))}
                        </select>

                        <div className="flex items-center gap-1.5 ml-1">
                            {canSearch && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 text-xs text-muted-foreground hover:text-foreground border border-border/50 hover:bg-muted gap-1.5"
                                    onClick={handleSearch}
                                >
                                    <Search size={13} />
                                    Rechercher
                                </Button>
                            )}

                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs text-muted-foreground hover:text-red-600 hover:bg-red-50 border border-border/50 hover:border-red-200 gap-1.5"
                                onClick={resetFiltrer}
                            >
                                <X size={13} />
                                Réinitialiser
                            </Button>
                        </div>
                    </div>
                </Card>

                {depenses.length === 0 ? (
                    <TableTransactionNotFound typeTransaction="depense" />
                ) : (
                    <TableTransaction
                        setUpdateTransactionId={setUpdateTransactionId}
                        setOpenModalUpdate={setOpenModal}
                        datas={depenses}
                        name="depense"
                    />
                )}
            </AuthenticatedLayout>
        </div>
    );
};

export default Depense;
