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
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "@/Components/ui/textarea";
import RevenusChart from "@/Components/RevenusChart";

export default function Revenus() {
    const revenus = usePage().props.revenus || [];
    const categories = usePage().props.categories || [];

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
        if (selectedMonth && getMonthRegisterRevenus(revenu.date) !== Number(selectedMonth)) {
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
                reset()
            }
        })
    }

    const handleDelete = (id) => {
        router.delete(route('revenus.delete', id), {
            onSuccess: () => {

            }
        })
    }

    const resetFiltrer = () => {
        setSelectedMonth("")
        setSelectedAmount("")
        setSelectedCategory("")
    }

    return (
        <div>
            <AuthenticatedLayout>
                <Head title="Revenus" />

                <div className="flex justify-between place-items-center">
                    <h2 className="text-2xl text-gray-700 font-semibold p-6">
                        Mes Revenus
                    </h2>

                    {/* Le modal d'enregistrement et son bouton */}
                    <Sheet className='py-6'>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                className="bg-indigo-500 text-white mb-2"
                            >
                                Ajouter un revenu
                            </Button>
                        </SheetTrigger>
                        <SheetContent onKeyDown={(e) => e.stopPropagation()}>
                            <SheetHeader>
                                <SheetTitle>Ajouter un revenu</SheetTitle>
                                {/* <SheetDescription>
                                Make changes to your profile here. Click save
                                when you're done.
                            </SheetDescription> */}
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Date
                                    </Label>
                                    <Input
                                        type="date"
                                        id="date"
                                        value={data.date}
                                        className="col-span-3"
                                        onChange={(e) => setData('date', e.target.value)}
                                    />
                                </div>
                                <span className="mx-8 italic text-red-400 font-light">{errors?.date}</span>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="montant"
                                        className="text-right"
                                    >
                                        Montant
                                    </Label>
                                    <Input
                                        type="text"
                                        id="montant"
                                        value={data.montant}
                                        className="col-span-3"
                                        onChange={(e) => setData('montant', e.target.value)}
                                    />
                                </div>
                                <span className="mx-8 italic text-red-400 font-light">{errors?.montant}</span>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <div className="relative flex place-items-center gap-6 w-[180px]">
                                        <label htmlFor="categorie" className="block text-sm font-medium text-gray-900">
                                            Catégorie
                                        </label>
                                        <select
                                            id="categorie"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="" disabled>Choisissez une categorie</option>
                                            {categories.map((categorie) => (
                                                <option key={categorie.id} value={categorie.id}>
                                                    {categorie.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="username"
                                        className="text-right"
                                    >
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        className="col-span-3"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                </div>
                                <span className="mx-8 italic text-red-400 font-light">{errors?.description}</span>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit" onClick={handleSubmit} className="bg-indigo-500" disabled={processing}>{processing ? "Ajout en cours" : "Ajouter un revenu"}</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                </div>

                {/* Filtre */}
                <Card className="mb-8">
                    <div className="flex items-center justify-center gap-6 p-3">
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

                        <div className="relative flex place-items-center gap-6 w-[180px]">
                            <select
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                id="categorie"
                                value={selectedCategory}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Selectionnez une categorie</option>
                                {
                                    categories.map((category) => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <button onClick={resetFiltrer}>
                            Actualiser
                        </button>
                    </div>
                </Card>

                {/* Affichage des revenus */}
                <Card className='shadow-md mb-8 p-6'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Categorie</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>

                            {fileredRevenus.map((revenu) => (
                                <TableRow key={revenu.id}>
                                    <TableCell>{revenu.id}</TableCell>
                                    <TableCell>{revenu.date}</TableCell>
                                    <TableCell>{revenu.montant} XOF</TableCell>
                                    <TableCell>
                                        {revenu.category?.name}
                                    </TableCell>
                                    <TableCell>{revenu.description}</TableCell>
                                    <TableCell className="flex gap-4">
                                        <Link href={route('revenus.edit', revenu.id)}>
                                            <Edit className="text-indigo-500" />
                                        </Link>
                                        <Link onClick={() => handleDelete(revenu.id)}>
                                            <Trash2 className="text-red-500" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableHeader>
                    </Table>
                </Card>

                <Card className='p-6'>
                    <RevenusChart />
                </Card>
            </AuthenticatedLayout>
        </div>
    );
}


//Cette function , pour chaque revenus , recupere le mois de son enregitrement
const getMonthRegisterRevenus = (dateRevenus) => {
    const date = new Date(dateRevenus)
    return date.getMonth()
}



