import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
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
import useTransaction from "@/hooks/useTransaction";

export const TableTransaction = ({
    datas,
    setUpdateTransactionId,
    setOpenModalUpdate,
}) => {
    const { deleteTransaction } = useTransaction();

    const handleDeleteRevenu = (id) => {
        deleteTransaction(id);

        router.reload(0);
    };

    console.log(datas);

    return (
        <Card className="mb-8 border border-gray-100 rounded-xl transition-all duration-300">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-bold text-muted-foreground">
                            DATE
                        </TableHead>
                        <TableHead className="font-bold text-muted-foreground">
                            DESCRIPTION
                        </TableHead>
                        <TableHead className="font-bold text-muted-foreground">
                            CATEGORIE
                        </TableHead>
                        <TableHead className="font-bold text-muted-foreground">
                            MONTANT
                        </TableHead>
                        <TableHead className="font-bold text-muted-foreground">
                            ACTIONS
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {datas.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell className="text-muted-foreground font-semibold">
                                {new Date(data.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-gray-800 font-semibold">
                                {data.description}
                            </TableCell>
                            <TableCell className={`text-muted-foreground `}>
                                <span
                                    style={{
                                        backgroundColor: data.category?.couleur,
                                        color: "white",
                                        fontWeight: "500",
                                    }}
                                    className={`px-2 py-0.5 text-center rounded-full`}
                                >
                                    {data.category?.nom}
                                </span>
                            </TableCell>
                            <TableCell
                                className={cn(
                                    " font-bold",
                                    data.type === "revenu"
                                        ? "text-green-600"
                                        : "text-red-600",
                                )}
                            >
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
                                        <DropdownMenuItem
                                            onClick={() => {
                                                setUpdateTransactionId(data.id);
                                                setOpenModalUpdate(true);
                                            }}
                                        >
                                            Modifier
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleDeleteRevenu(data.id)
                                            }
                                            variant="destructive"
                                        >
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
