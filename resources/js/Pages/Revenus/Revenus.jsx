import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { FileSpreadsheet } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "@/Components/ui/textarea";
import RevenusChart from "@/Components/RevenusChart";
import Notification from "@/Components/Notification";
import { CardTable } from "@/Components/CardTable";
import { getMonthRegister } from "@/services/helpers";


export default function Revenus() {
    const revenus = usePage().props.revenus || [];
    const totalRevenus = usePage().props.totalRevenus;
    const categories = usePage().props.categories || [];
    const [showModal, SetShowModal] = useState(false);
    const [notify, setNotify] = useState(false);

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
    ]

    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        montant: '',
        category_id: '',
        description: ''
    })

    //Etats pour les filtres
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedAmount, setSelectedAmount] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const fileredRevenus = revenus.filter(revenu => {
        //Filtrer par mois
        if (selectedMonth && getMonthRegister(revenu.date) !== Number(selectedMonth)) {
            return false
        }

        //Filtrer par ctegorie
        if (selectedCategory && revenu.category?.id !== Number(selectedCategory)) {
            return false;
        }

        return true
    }).sort((a, b) => {
        if (selectedAmount === "0") return a.montant - b.montant;
        if (selectedAmount === "1") return b.montant - a.montant;

        return 0
    })



    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("revenus.store"), {
            onSuccess: () => {
                reset(),
                    SetShowModal(false),
                    setNotify(true)
            }
        })
    }


    const resetFiltrer = () => {
        setSelectedMonth("");
        setSelectedAmount("");
        setSelectedCategory("");
        setNotify(false);
    }

    const handleExcel = () => {
        window.location.href = route("revenus.excel");
    }

    return (
        <div>
            <AuthenticatedLayout>
                <Head title="Revenus" />
                <section className="w-full bg-white p-8 rounded-2xl shadow-xl transition-all duration-300">

                    {/* Titre et Bouton */}
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
                            Mes Revenus
                        </h2>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button onClick={() => SetShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-full shadow-lg transition-all duration-300">
                                    + Ajouter un revenu
                                </Button>
                            </SheetTrigger>

                            {showModal && (
                                <SheetContent onKeyDown={(e) => e.stopPropagation()} className="p-6">
                                    <SheetHeader>
                                        <SheetTitle className="text-xl font-semibold text-gray-900">Ajouter un revenu</SheetTitle>
                                    </SheetHeader>

                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                type="date"
                                                id="date"
                                                value={data.date}
                                                onChange={(e) => setData("date", e.target.value)}
                                                className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                            {errors?.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="montant">Montant</Label>
                                            <Input
                                                type="number"
                                                id="montant"
                                                value={data.montant}
                                                onChange={(e) => setData("montant", e.target.value)}
                                                className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                            {errors?.montant && <p className="text-sm text-red-500 mt-1">{errors.montant}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="categorie">Catégorie</Label>
                                            <select
                                                id="categorie"
                                                value={data.category_id}
                                                onChange={(e) => setData("category_id", e.target.value)}
                                                className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="" disabled>Choisissez une catégorie</option>
                                                {categories.map((categorie) => (
                                                    <option key={categorie.id} value={categorie.id}>
                                                        {categorie.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData("description", e.target.value)}
                                                className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                            {errors?.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                                        </div>
                                    </div>

                                    <SheetFooter className="mt-6 flex justify-end">
                                        <SheetClose asChild>
                                            <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition" disabled={processing}>
                                                {processing ? "Ajout en cours..." : "Ajouter"}
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            )}
                        </Sheet>
                    </div>

                    {notify && <Notification message={"Un revenu a été ajouté"} />}

                    {/* Filtres et export */}
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex gap-4">
                            <div className="relative flex items-center w-[180px]">
                                <select
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    value={selectedMonth}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="" disabled>Mois</option>
                                    {mois.map((mois) => (
                                        <option value={mois.nb} key={mois.nb}>{mois.nom}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative flex items-center w-[180px]">
                                <select
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    value={selectedCategory}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="" disabled>Catégorie</option>
                                    {categories.map((category) => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative flex items-center w-[180px]">
                                <select
                                    onChange={(e) => setSelectedAmount(e.target.value)}
                                    value={selectedAmount}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="" disabled>Trier</option>
                                    <option value="0">Moins élevé</option>
                                    <option value="1">Plus élevé</option>
                                </select>
                            </div>

                            <button onClick={resetFiltrer} className="text-indigo-600 hover:underline text-sm">
                                Actualiser
                            </button>
                        </div>

                        <div>
                            <button onClick={handleExcel} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2">
                                <FileSpreadsheet />
                                EXCEL
                            </button>
                        </div>
                    </div>

                    {/* Tableau et graphique */}
                    <div className="flex gap-4">
                        <div className="w-3/4">
                            <CardTable datas={fileredRevenus} name="revenus"/>
                        </div>

                        <div className="w-1/4 flex flex-col gap-2">
                            <div className="flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                                <span className="text-gray-600">Total des revenus de ce mois</span>
                                <span className="text-slate-900 font-semibold text-2xl">{totalRevenus.toLocaleString('fr-CI', { style: 'currency', currency: 'XOF' })}</span>
                            </div>

                            <Card className="p-8 shadow-md rounded-xl bg-white">
                                <RevenusChart />
                            </Card>
                        </div>
                    </div>

                </section>
            </AuthenticatedLayout>
        </div>
    )
}




