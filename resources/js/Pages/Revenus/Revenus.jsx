import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { TableTransaction } from "@/Components/transaction/TableTransaction";
import { TableTransactionNotFound } from "@/Components/transaction/TableTransactionNotFound";
import ModalTransactionUpdate from "@/Components/transaction/ModalTransactionUpdate";

export default function Revenus() {
    const { revenus } = usePage().props;
    const [updateTransactionId, setUpdateTransactionId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const resetFiltrer = () => {
        setSelectedMonth("");
        setSelectedAmount("");
        setSelectedCategory("");
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
                {/* <Card className="mb-4 px-6 py-4">
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
                </Card> */}

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
