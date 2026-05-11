import { Card } from "@/Components/ui/card";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FileSpreadsheet, X } from "lucide-react";
import React, { useState } from "react";

import Notification from "@/Components/Notification";

import { getMonthRegister } from "@/services/helpers";
import { TableTransaction } from "@/Components/transaction/TableTransaction";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export default function Revenus() {
    const revenus = usePage().props.revenus || [];
    const totalRevenus = usePage().props.totalRevenus;
    const categories = usePage().props.categories || [];
    const [showModal, SetShowModal] = useState(false);
    const [notify, setNotify] = useState(false);


    const { data, setData, post, processing, errors, reset } = useForm({
        date: "",
        montant: "",
        category_id: "",
        description: "",
    });

    //Etats pour les filtres
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedAmount, setSelectedAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const fileredRevenus = revenus
        .filter((revenu) => {
            //Filtrer par mois
            if (
                selectedMonth &&
                getMonthRegister(revenu.date) !== Number(selectedMonth)
            ) {
                return false;
            }

            //Filtrer par ctegorie
            if (
                selectedCategory &&
                revenu.category?.id !== Number(selectedCategory)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("revenus.store"), {
            onSuccess: () => {
                (reset(), SetShowModal(false), setNotify(true));
            },
        });
    };

    const resetFiltrer = () => {
        setSelectedMonth("");
        setSelectedAmount("");
        setSelectedCategory("");
        setNotify(false);
    };

    const handleExcel = () => {
        window.location.href = route("revenus.excel");
    };

    return (
        <div>
            <AuthenticatedLayout>
                <Head title="Revenus" />
                {/* Titre et Bouton */}
                <div className="flex justify-between items-center mb-7">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
                            Aperçu des Revenus
                        </h2>

                        <p className="text-muted-foreground text-xs">
                            Gérer et suivez vos sources de revenus.
                        </p>
                    </div>
                </div>

                {notify && <Notification message={"Un revenu a été ajouté"} />}

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

                {/* Table d'affichage */}
                <TableTransaction datas={fileredRevenus} name="revenus" />
            </AuthenticatedLayout>
        </div>
    );
}
