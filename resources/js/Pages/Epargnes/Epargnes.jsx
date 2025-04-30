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


const Epargnes = () => {

    const { epargnes } = usePage().props || [];
    const [showModal, SetShowModal] = useState(false)

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
        compte: '',
        projet: ''
    })


    //Etats pour les filtres
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedAmount, setSelectedAmount] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    const fileredEpargnes = epargnes.filter(epargne => {
        //Filtrer par mois
        if (selectedMonth && getMonthRegisterEpargnes(epargne.date) !== Number(selectedMonth)) {
            return false
        }

        return true
    }).sort((a, b) => {
        if (selectedAmount === "0") return a.montant - b.montant;
        if (selectedAmount === "1") return b.montant - a.montant;

        return 0
    })



    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("epargnes.store"), {
            onSuccess: () => {
                reset(),
                    SetShowModal(false)
            }
        })
    }

    const handleDelete = (id) => {
        router.delete(route('epargnes.delete', id), {
            onSuccess: () => {

            }
        })
    }

    const resetFiltrer = () => {
        setSelectedMonth("")
        setSelectedAmount("")
        setSelectedCategory("")
    }

    const handleExcel = () => {
        window.location.href = route('epargnes.excel');
    }

    return (
        <AuthenticatedLayout>
            <Head title="Epargnes" />

            <section className="w-full bg-white p-8 rounded-xl">

                {/* Titre et Bouton */}
                <div className="flex justify-between place-items-center mb-5">
                    <h2 className="text-2xl text-gray-700 font-semibold">
                        Mes Epargnes
                    </h2>

                    {/* Le modal d'enregistrement et son bouton */}
                    <Sheet className="py-6">
                        <SheetTrigger asChild>
                            <Button onClick={() => SetShowModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                                + Ajouter une epargnes
                            </Button>
                        </SheetTrigger>

                        {
                            showModal && (
                                <SheetContent onKeyDown={(e) => e.stopPropagation()} className="p-6">
                                    <SheetHeader>
                                        <SheetTitle className="text-xl font-semibold text-gray-900">Ajouter une epargnes</SheetTitle>
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

                                        {/* Compte */}
                                        <div>
                                            <Label htmlFor="compte">Compte d'epargnes</Label>
                                            <Input
                                                type="text"
                                                id="compte"
                                                value={data.compte}
                                                onChange={(e) => setData("compte", e.target.value)}
                                            />
                                            {errors?.compte && <p className="text-sm text-red-500 mt-1">{errors.compte}</p>}
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <Label htmlFor="projet">Projet</Label>
                                            <Textarea
                                                id="projet"
                                                value={data.projet}
                                                onChange={(e) => setData("projet", e.target.value)}
                                            />
                                            {errors?.projet && <p className="text-sm text-red-500 mt-1">{errors.projet}</p>}
                                        </div>
                                    </div>

                                    <SheetFooter className="mt-6 flex justify-end">
                                        <SheetClose asChild>
                                            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition" disabled={processing}>
                                                {processing ? "Ajout en cours..." : "Ajouter"}
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            )
                        }
                    </Sheet>
                </div>

                {/* Filtres*/}
                <div className="flex justify-between place-items-center mb-5">
                    <div className="flex gap-4">
                        <div className="relative flex place-items-center gap-6 w-[180px]">
                            <select
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                id="categorie"
                                value={selectedMonth}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Choisissez un mois</option>
                                {
                                    mois.map((mois) => (
                                        <option value={mois.nb} key={mois.nb}>{mois.nom}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="relative flex place-items-center gap-6 w-[180px]">
                            <select
                                onChange={(e) => setSelectedAmount(e.target.value)}
                                id="montant"
                                value={selectedAmount}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Classez par montant</option>
                                <option value="0">Moins élévé</option>
                                <option value="1">Plus élévé</option>
                            </select>
                        </div>

                        <button onClick={resetFiltrer}>
                            Actualiser
                        </button>
                    </div>

                </div>

                {/* Table et graphique*/}
                <div className="flex gap-4">
                    <div className="w-3/4">
                        <Card className='shadow-md mb-8 p-6'>
                            <Table>
                                <TableHeader>
                                    <TableRow >
                                        <TableHead>ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Montant</TableHead>
                                        <TableHead>Compte d'epargnes</TableHead>
                                        <TableHead>Projet</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>

                                    {fileredEpargnes.map((epargne) => (
                                        <TableRow key={epargne.id}>
                                            <TableCell>{epargne.id}</TableCell>
                                            <TableCell>{epargne.date}</TableCell>
                                            <TableCell>{epargne.montant.toLocaleString('fr-CI', { style: "currency", currency: "XOF" })}</TableCell>
                                            <TableCell>
                                                {epargne.compte}
                                            </TableCell>
                                            <TableCell>{epargne.projets}</TableCell>
                                            <TableCell className="flex gap-4">
                                                <Link href={route('epargnes.edit', epargne.id)}>
                                                    <Edit className="text-indigo-500" />
                                                </Link>
                                                <Link onClick={() => handleDelete(epargne.id)}>
                                                    <Trash2 className="text-red-500" />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableHeader>
                            </Table>
                        </Card>
                    </div>

                    <div className="w-1/4">
                        <div className="flex flex-col gap-1 border rounded-md p-5">
                            <span className="text-gray-600">Total des revenus de ce mois</span>
                            <span className="text-slate-900 font-semibold text-2xl">1 225 200 fcfa</span>
                        </div>
                    </div>
                </div>

            </section>

        </AuthenticatedLayout>
    )
}

export default Epargnes

//Cette function , pour chaque epargne , recupere le mois de son enregitrement
const getMonthRegisterEpargnes = (dateEpargne) => {
    const date = new Date(dateEpargne)
    return date.getMonth()
}

