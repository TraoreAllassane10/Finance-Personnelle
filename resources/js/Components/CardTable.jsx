import React from 'react'
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card } from "@/Components/ui/card";
import { Link, router } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";

export const CardTable = ({ datas, name }) => {

    const handleDeleteRevenu = (id) => {
        router.delete(route('revenus.delete', id), {
            onSuccess: () => {

            }
        })
    }


    const handleDeleteDepense = (id) => {
        router.delete(route('depenses.delete', id), {
            onSuccess: () => {

            }
        })
    }

    return (
        <Card className="shadow-lg mb-8 p-6 border border-gray-100 rounded-xl transition-all duration-300">
            <Table>
                <TableHeader>
                    <TableRow>

                        <TableHead>Date</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    {datas.map((data) => (
                        <TableRow key={data.id}>

                            <TableCell>{data.date}</TableCell>
                            <TableCell>{data.montant.toLocaleString('fr-CI', { style: "currency", currency: "XOF" })}</TableCell>
                            <TableCell>{data.category?.name}</TableCell>
                            <TableCell>{data.description}</TableCell>
                            <TableCell className="flex gap-2">
                                <Link href={name === "depense" ? route('depenses.edit', data.id) : route('revenus.edit', data.id)}>
                                    <Edit className="text-indigo-500 w-5 h-5" />
                                </Link>
                                <Link onClick={() => {name === "depense" ? handleDeleteDepense(data.id) : handleDeleteRevenu(data.id)}}>
                                    <Trash2 className="text-red-500 w-5 h-5" />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableHeader>
            </Table>
        </Card>
    )
}
