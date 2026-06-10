import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { TableTransaction } from "@/Components/transaction/TableTransaction";
import { TableTransactionNotFound } from "@/Components/transaction/TableTransactionNotFound";
import ModalTransactionUpdate from "@/Components/transaction/ModalTransactionUpdate";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Search, X } from "lucide-react";

export default function Revenus() {
    const { revenus, categories } = usePage().props;

    const [updateTransactionId, setUpdateTransactionId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [categorieSearch, setCategorieSearch] = useState("");
    const [monthSearch, setMonthSearch] = useState("");

    const canSearch = categorieSearch || monthSearch;

    const handleSearch = async () => {
        try {
            router.get("/revenus", {
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

        router.visit("/revenus");
    };

    return (
        <div>
            <AuthenticatedLayout>
                <Head title="Revenus" />

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
                        <h1 className="text-3xl font-bold">Revenus</h1>
                        <p className="text-sm text-muted-foreground">
                            Gérer et suivez vos sources de revenus.
                        </p>
                    </div>
                </section>

                {/* Section de filtre */}
                <Card className="mb-4 px-6 py-4">
                    <div className="flex justify-between ">
                        <div className="flex flex-wrap gap-4">
                            <div>
                                <Input
                                    type="month"
                                    value={monthSearch}
                                    onChange={(e) =>
                                        setMonthSearch(e.target.value)
                                    }
                                />
                            </div>

                            <div className="relative flex items-center w-[180px]">
                                <select
                                    value={categorieSearch}
                                    onChange={(e) =>
                                        setCategorieSearch(e.target.value)
                                    }
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="tout">
                                        Toutes les catégories
                                    </option>
                                    {categories.map((categorie) => (
                                        <option
                                            key={categorie.id}
                                            value={categorie.id}
                                        >
                                            {categorie.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {canSearch && (
                                <Button
                                    variant={"ghost"}
                                    className=" text-sm"
                                    onClick={handleSearch}
                                >
                                    <Search />
                                    Rechercher
                                </Button>
                            )}

                            <Button
                                variant={"ghost"}
                                className=" text-sm"
                                onClick={resetFiltrer}
                            >
                                <X />
                                Réinitialiser
                            </Button>
                        </div>
                    </div>
                </Card>

                {revenus.length === 0 ? (
                    <TableTransactionNotFound typeTransaction="revenu" />
                ) : (
                    <TableTransaction
                        setUpdateTransactionId={setUpdateTransactionId}
                        setOpenModalUpdate={setOpenModal}
                        datas={revenus}
                        name="revenus"
                    />
                )}
            </AuthenticatedLayout>
        </div>
    );
}
