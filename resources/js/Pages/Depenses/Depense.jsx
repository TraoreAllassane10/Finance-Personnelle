import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";

import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

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
import { Edit, FileSpreadsheet, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "@/Components/ui/textarea";
import DepensesChart from "@/Components/DepensesChart";
import Notification from "@/Components/Notification";

const Depense = () => {
    const depenses = usePage().props.depenses || [];
    const totalDepense = usePage().props.totalDepense;
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
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        montant: '',
        category_id: '',
        description: ''
    });


    //Etats pour les filtres
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedAmount, setSelectedAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const fileredDepenses = depenses.filter(depense => {
        //Filtrer par mois
        if (selectedMonth && getMonthRegisterdepenses(depense.date) !== Number(selectedMonth)) {
            return false
        }

        //Filtrer par ctegorie
        if (selectedCategory && depense.category?.id !== Number(selectedCategory)) {
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
        post(route("depenses.store"), {
            onSuccess: () => {
                reset(),
                    SetShowModal(false);
                setNotify(true)
            }
        })
    }

    const handleDelete = (id) => {
        router.delete(route('depenses.delete', id), {
            onSuccess: () => {

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
        window.location.href = route('depenses.excel');
    }



    return (
        <div>
            <AuthenticatedLayout>
                <Head title="Depenses" />

                <section className="w-full bg-white p-8 rounded-2xl shadow-xl transition-all duration-300">

                    {/* Titre et Bouton */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
                            Mes Dépenses
                        </h2>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    onClick={() => SetShowModal(true)}
                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-full shadow-lg transition-all duration-300"
                                >
                                    + Ajouter une dépense
                                </Button>
                            </SheetTrigger>

                            {showModal && (
                                <SheetContent onKeyDown={(e) => e.stopPropagation()} className="p-6">
                                    <SheetHeader>
                                        <SheetTitle className="text-lg font-semibold text-slate-800">Ajouter une dépense</SheetTitle>
                                    </SheetHeader>

                                    <div className="space-y-4 mt-4">
                                        {/* Date */}
                                        <div>
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                type="date"
                                                id="date"
                                                value={data.date}
                                                onChange={(e) => setData("date", e.target.value)}
                                            />
                                            {errors?.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
                                        </div>

                                        {/* Montant */}
                                        <div>
                                            <Label htmlFor="montant">Montant</Label>
                                            <Input
                                                type="number"
                                                id="montant"
                                                value={data.montant}
                                                onChange={(e) => setData("montant", e.target.value)}
                                            />
                                            {errors?.montant && <p className="text-sm text-red-500 mt-1">{errors.montant}</p>}
                                        </div>

                                        {/* Catégorie */}
                                        <div>
                                            <Label htmlFor="categorie">Catégorie</Label>
                                            <select
                                                id="categorie"
                                                value={data.category_id}
                                                onChange={(e) => setData("category_id", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                            >
                                                <option value="" disabled>Choisissez une catégorie</option>
                                                {categories.map((categorie) => (
                                                    <option key={categorie.id} value={categorie.id}>
                                                        {categorie.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData("description", e.target.value)}
                                            />
                                            {errors?.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                                        </div>
                                    </div>

                                    <SheetFooter className="mt-6 flex justify-end">
                                        <SheetClose asChild>
                                            <Button
                                                onClick={handleSubmit}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-sm transition"
                                                disabled={processing}
                                            >
                                                {processing ? "Ajout en cours..." : "Ajouter"}
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            )}
                        </Sheet>
                    </div>

                    {notify && <Notification message={"Une dépense a été ajoutée"} />}

                    {/* Filtres et bouton export */}
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <div className="flex gap-4 flex-wrap">
                            <div className="w-44">
                                <select
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    value={selectedMonth}
                                    className="w-full rounded-lg border-gray-300 py-2 px-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="" disabled>Mois</option>
                                    {mois.map((mois) => (
                                        <option value={mois.nb} key={mois.nb}>{mois.nom}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-44">
                                <select
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    value={selectedCategory}
                                    className="w-full rounded-lg border-gray-300 py-2 px-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="" disabled>Catégorie</option>
                                    {categories.map((category) => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-44">
                                <select
                                    onChange={(e) => setSelectedAmount(e.target.value)}
                                    value={selectedAmount}
                                    className="w-full rounded-lg border-gray-300 py-2 px-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="" disabled>Trier</option>
                                    <option value="0">Moins élevé</option>
                                    <option value="1">Plus élevé</option>
                                </select>
                            </div>

                            <button
                                onClick={resetFiltrer}
                                className="text-sm text-indigo-600 hover:underline"
                            >
                                Actualiser
                            </button>
                        </div>

                        <button
                            onClick={handleExcel}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
                        >
                            <FileSpreadsheet className="w-5 h-5" />
                            EXCEL
                        </button>
                    </div>

                    {/* Table et graphique */}
                    <div className="flex gap-4 flex-col lg:flex-row">
                        <div className="w-full lg:w-3/4">
                            <Card className="shadow-lg mb-8 p-6 border border-gray-100 rounded-xl transition-all duration-300">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Montant</TableHead>
                                            <TableHead>Catégorie</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                        {fileredDepenses.map((depense) => (
                                            <TableRow key={depense.id}>
                                                <TableCell>{depense.id}</TableCell>
                                                <TableCell>{depense.date}</TableCell>
                                                <TableCell>{depense.montant.toLocaleString('fr-CI', { style: "currency", currency: "XOF" })}</TableCell>
                                                <TableCell>{depense.category?.name}</TableCell>
                                                <TableCell>{depense.description}</TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link href={route('depenses.edit', depense.id)}>
                                                        <Edit className="text-indigo-500 w-5 h-5" />
                                                    </Link>
                                                    <Link onClick={() => handleDelete(depense.id)}>
                                                        <Trash2 className="text-red-500 w-5 h-5" />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                </Table>
                            </Card>
                        </div>

                        <div className="w-full lg:w-1/4 flex flex-col gap-4">
                            <div className="flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                                <span className="text-gray-600">Total des depenses de ce mois</span>
                                <span className="text-slate-900 font-semibold text-2xl">{totalDepense.toLocaleString('fr-CI', { style: 'currency', currency: 'XOF' })}</span>
                            </div>

                            <Card className="p-6 shadow-sm rounded-xl">
                                <DepensesChart />
                            </Card>
                        </div>
                    </div>
                </section>
            </AuthenticatedLayout>
        </div>
    )


}

export default Depense

//Cette function , pour chaque revenus , recupere le mois de son enregitrement
const getMonthRegisterdepenses = (dateDepense) => {
    const date = new Date(dateDepense)
    return date.getMonth()
}
