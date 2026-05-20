import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Card } from "@/Components/ui/card";
import { router } from "@inertiajs/react";

import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { TableTransactionNotFound } from "./TableTransactionNotFound";

export const TableTransaction = ({ datas }) => {
    const handleDeleteRevenu = (id) => {
        router.delete(route("revenus.delete", id), {
            onSuccess: () => {},
        });
    };

    const handleDeleteDepense = (id) => {
        router.delete(route("depenses.delete", id), {
            onSuccess: () => {},
        });
    };

    return (
        <Card className="mb-8 border border-gray-100 rounded-xl transition-all duration-300">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-muted-foreground">
                            DATE
                        </TableHead>
                        <TableHead className="font-semibold text-muted-foreground">
                            DESCRIPTION
                        </TableHead>
                        <TableHead className="font-semibold text-muted-foreground">
                            CATEGORIE
                        </TableHead>
                        <TableHead className="font-semibold text-muted-foreground">
                            MONTANT
                        </TableHead>
                        <TableHead className="font-semibold text-muted-foreground">
                            ACTIONS
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {datas.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell className="text-muted-foreground">
                                {new Date(data.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-slate-800 font-bold">
                                {data.description}
                            </TableCell>
                            <TableCell className={`text-muted-foreground`}>
                                <span
                                    style={{
                                        backgroundColor: data.category?.couleur,
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                    className="px-4 py-1 text-center rounded-full"
                                >
                                    {data.category?.nom}
                                </span>
                            </TableCell>
                            <TableCell className={cn(' font-bold', 
                                data.type === "revenu" ? "text-green-600" : "text-red-600"
                            )}>
                                {data.type === "revenu" ? "+" : "-"}
                                {data.montant.toLocaleString("fr-CI", {
                                    style: "currency",
                                    currency: "XOF",
                                })}
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-8"
                                        >
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">
                                                Open menu
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            Modifier
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem variant="destructive">
                                            Supprimer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};
