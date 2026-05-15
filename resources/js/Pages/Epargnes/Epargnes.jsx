import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";

import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ArrowUp, Landmark, PlusCircle, Wallet } from "lucide-react";
import React, { useState } from "react";
import { getMonthRegister } from "@/services/helpers";

import { depotRecent, recentesTransaction } from "@/constant";

const Epargnes = () => {
    const { epargnes } = usePage().props || [];

    const mois = [
        { nb: 0, nom: "Janvier" },
        { nb: 1, nom: "Fevrier" },
        { nb: 2, nom: "Mars" },
        { nb: 3, nom: "Avril" },
        { nb: 4, nom: "Mai" },
        { nb: 5, nom: "Juin" },
        { nb: 6, nom: "Juillet" },
        { nb: 7, nom: "Août" },
        { nb: 8, nom: "Septembre" },
        { nb: 9, nom: "Octobre" },
        { nb: 10, nom: "Novembre" },
        { nb: 11, nom: "Decembre" },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        date: "",
        montant: "",
        compte: "",
        projet: "",
    });

    //Etats pour les filtres
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedAmount, setSelectedAmount] = useState("");

    const fileredEpargnes = epargnes
        .filter((epargne) => {
            //Filtrer par mois
            if (
                selectedMonth &&
                getMonthRegister(epargne.date) !== Number(selectedMonth)
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
        post(route("epargnes.store"), {
            onSuccess: () => {
                (reset(), SetShowModal(false));
                setNotify(true);
            },
        });
    };

    const handleDelete = (id) => {
        router.delete(route("epargnes.delete", id), {
            onSuccess: () => {},
        });
    };

    const resetFiltrer = () => {
        setSelectedMonth("");
        setSelectedAmount("");
        setSelectedCategory("");
        setNotify(false);
    };

    const handleExcel = () => {
        window.location.href = route("epargnes.excel");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Epargnes" />

            {/* Entete de la page */}
            <section className="mb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">Epargnes</h1>
                    <p className="text-sm text-muted-foreground">
                        Suivre vos comptes d'epargnes et la progression de votre
                        objectif.
                    </p>
                </div>
            </section>

            {/* Carte Total et compte actifs */}
            <section className="flex gap-4 mb-6">
                <Card className="w-1/4 p-4 bg-gradient-to-br from-white to-yellow-50">
                    <div className="flex place-items-center gap-2 mb-4">
                        <Landmark size={16} className="text-yellow-500" />
                        <span className="text-sm text-muted-foreground uppercase">
                            Total d'epargne
                        </span>
                    </div>

                    <div className="text-gray-800 font-bold text-xl">
                        15 000 000 fcfa
                    </div>

                    <div className="flex gap-2 mt-8">
                        <div className="bg-green-50 text-green-600 font-bold px-1 py-0.5 flex gap-1 justify-between items-center place-items-center rounded-md">
                            <ArrowUp /> +4.2%
                        </div>

                        <p className="text-muted-foreground">
                            {" "}
                            vs mois dernier
                        </p>
                    </div>
                </Card>

                <Card className="w-3/4">
                    <CardHeader className="border-b border-gray-200 text-gray-800 font-semibold text-xl">
                        Comptes actifs
                    </CardHeader>

                    <CardContent className="mt-2 flex gap-4">
                        <div className="flex gap-2 place-items-center border border-gray-200 p-4 w-1/2 rounded-lg">
                            <div className="bg-slate-100 flex items-center justify-center p-1 rounded-sm">
                                <Wallet className="text-yellow-500" />
                            </div>

                            <div className="flex flex-col ">
                                <h2 className="text-gray-800 font-semibold text-xl">
                                    Epargne Principal
                                </h2>
                                <p className="text-muted-foreground text-xs">
                                    10 000 000 fcfa
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 place-items-center border border-gray-200 p-4 w-1/2 rounded-lg">
                            <div className="bg-slate-100 flex items-center justify-center p-1 rounded-sm">
                                <Wallet className="text-yellow-500" />
                            </div>

                            <div className="flex flex-col ">
                                <h2 className="text-gray-800 font-semibold text-xl">
                                    Fond de vacance
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    500 000 fcfa
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Carte objectifs et virement recent */}
            <section className="flex gap-4">
                <Card className="w-[30%]">
                    <CardHeader className="border-b border-gray-200 text-gray-800 font-semibold text-xl">
                        Objectifs actuel
                    </CardHeader>

                    <CardContent className="mt-4 space-y-6">
                        <div className="flex gap-4">
                            <div className="flex justify-center items-center border-4 border-gray-500 rounded-full p-1 text-sm">
                                80%
                            </div>

                            <div className="w-full">
                                <h3 className="text-xl font-semibold">
                                    Fond d'urgence
                                </h3>
                                <div className="flex justify-between text-muted-foreground text-xs">
                                    <span>300000 fcfa</span>
                                    <span>sur 500000 fcfa</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex justify-center items-center border-4 border-gray-500 rounded-full p-1 text-sm">
                                80%
                            </div>

                            <div className="w-full">
                                <h3 className="text-xl font-semibold">
                                    Nouvelle voiture
                                </h3>
                                <div className="flex justify-between text-muted-foreground text-xs">
                                    <span>3 000 000 fcfa</span>
                                    <span>sur 5 000 000 fcfa</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant={"outline"}
                            className="w-full flex gap-2"
                        >
                            <PlusCircle />
                            creer un nouvel objectif
                        </Button>
                    </CardContent>
                </Card>

                <Card className="w-[70%]">
                    <CardHeader className="border-b border-gray-200 text-gray-800 font-semibold text-xl">
                        Dépôts récents
                    </CardHeader>

                    <CardContent className="mt-2 flex gap-4">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold text-muted-foreground">
                                        DATE
                                    </TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">
                                        COMPTE
                                    </TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">
                                        MONTANT
                                    </TableHead>
                                </TableRow>
                                {depotRecent.map((data) => (
                                    <TableRow key={data.id}>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                data.date,
                                            ).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell className="text-muted-foreground">
                                            {data.compte}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            <span
                                                className={` font-bold`}
                                            >
                                                {data.montant.toLocaleString(
                                                    "fr-CI",
                                                    {
                                                        style: "currency",
                                                        currency: "XOF",
                                                    },
                                                )}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableHeader>
                        </Table>
                    </CardContent>
                </Card>
            </section>
        </AuthenticatedLayout>
    );
};

export default Epargnes;
