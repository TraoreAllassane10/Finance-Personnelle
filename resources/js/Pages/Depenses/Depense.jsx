import { Card } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { X } from "lucide-react";
import React, { useState } from "react";
import { getMonthRegister } from "@/services/helpers";
import { TableTransaction } from "@/Components/transaction/TableTransaction";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { TableTransactionNotFound } from "@/Components/transaction/TableTransactionNotFound";
import ModalTransactionUpdate from "@/Components/transaction/ModalTransactionUpdate";

const Depense = () => {
    const { depenses } = usePage().props;
    const [updateTransactionId, setUpdateTransactionId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    //Etats pour les filtres
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedAmount, setSelectedAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const fileredDepenses = depenses
        .filter((depense) => {
            //Filtrer par mois
            if (
                selectedMonth &&
                getMonthRegister(depense.date) !== Number(selectedMonth)
            ) {
                return false;
            }

            //Filtrer par ctegorie
            if (
                selectedCategory &&
                depense.category?.id !== Number(selectedCategory)
            ) {
                return false;
            }

            return true;
        })
        .sort((a, b) => {
            if (selectedAmount === "0") return a.montant - b.montant;
            if (selectedAmount === "1") return b.montant - a.montant;

            return 0;
        });

    const resetFiltrer = () => {
        setSelectedMonth("");
        setSelectedAmount("");
        setSelectedCategory("");
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
                <Card className="mb-4 px-6 py-4">
                    <div className="flex justify-between ">
                        <div className="flex flex-wrap gap-4">
                            <div>
                                <Input type="date" />
                            </div>

                            <div className="relative flex items-center w-[180px]">
                                <select
                                    onChange={(e) =>
                                        setSelectedAmount(e.target.value)
                                    }
                                    value={selectedAmount}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="" disabled>
                                        Trier
                                    </option>
                                    <option value="0">Moins élevé</option>
                                    <option value="1">Plus élevé</option>
                                </select>
                            </div>

                            <Button
                                variant={"ghost"}
                                onClick={resetFiltrer}
                                className=" text-sm"
                            >
                                <X />
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
                        datas={fileredDepenses}
                        name="depense"
                    />
                )}
            </AuthenticatedLayout>
        </div>
    );
};

export default Depense;
