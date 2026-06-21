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
import { Card } from "@/Components/ui/card";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { ArrowDownIcon, ArrowUpIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import useTransaction from "@/hooks/useTransaction";

export const TableTransaction = ({
    datas,
    setUpdateTransactionId,
    setOpenModalUpdate,
}) => {
    const { deleteTransaction } = useTransaction();

    const handleDeleteTransaction = (id) => {
        deleteTransaction(id);
        router.reload(0);
    };

    const netBalance = datas.reduce((acc, data) => {
        return data.type === "revenu"
            ? acc + data.montant
            : acc - data.montant;
    }, 0);

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-base font-medium text-foreground">
                        Transactions
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {datas.length} transaction{datas.length > 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            <Card className="border border-border/60 rounded-xl overflow-hidden ">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground py-3 px-4">
                                Date
                            </TableHead>
                            <TableHead className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground py-3 px-4">
                                Description
                            </TableHead>
                            <TableHead className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground py-3 px-4">
                                Catégorie
                            </TableHead>
                            <TableHead className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground py-3 px-4">
                                Montant
                            </TableHead>
                            <TableHead className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground py-3 px-4 w-[90px]">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {datas.map((data) => (
                            <TableRow
                                key={data.id}
                                className="border-b border-border/50 hover:bg-muted/30 transition-colors duration-100"
                            >
                                {/* Date */}
                                <TableCell className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
                                    {new Date(data.date).toLocaleDateString("fr-CI", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </TableCell>

                                {/* Description */}
                                <TableCell className="py-3 px-4">
                                    <p className="text-sm font-medium text-foreground">
                                        {data.description}
                                    </p>
                                </TableCell>

                                {/* Catégorie */}
                                <TableCell className="py-3 px-4">
                                    {data.category && (
                                        <span
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                                            style={{
                                                backgroundColor:
                                                    data.category.couleur + "18",
                                                color: data.category.couleur,
                                            }}
                                        >
                                            <span
                                                className="size-1.5 rounded-full flex-shrink-0"
                                                style={{
                                                    backgroundColor:
                                                        data.category.couleur,
                                                }}
                                            />
                                            {data.category.nom}
                                        </span>
                                    )}
                                </TableCell>

                                {/* Montant */}
                                <TableCell className="py-3 px-4">
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
                                            data.type === "revenu"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-red-50 text-red-700"
                                        )}
                                    >
                                        {data.type === "revenu" ? (
                                            <ArrowDownIcon size={11} />
                                        ) : (
                                            <ArrowUpIcon size={11} />
                                        )}
                                        {data.montant.toLocaleString("fr-CI", {
                                            style: "currency",
                                            currency: "XOF",
                                        })}
                                    </span>
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="py-3 px-4">
                                    <div className="flex items-center gap-1.5">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-7 text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50"
                                            onClick={() => {
                                                setUpdateTransactionId(data.id);
                                                setOpenModalUpdate(true);
                                            }}
                                        >
                                            <PencilIcon size={13} />
                                            <span className="sr-only">Modifier</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-7 text-muted-foreground hover:text-red-600 hover:bg-red-50 border border-border/50 hover:border-red-200"
                                            onClick={() =>
                                                handleDeleteTransaction(data.id)
                                            }
                                        >
                                            <Trash2Icon size={13} />
                                            <span className="sr-only">Supprimer</span>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow className="bg-muted/50 hover:bg-muted/50 border-t border-border/60">
                            <TableCell
                                colSpan={3}
                                className="py-3 px-4 text-xs text-muted-foreground"
                            >
                                Solde net
                            </TableCell>
                            <TableCell colSpan={2} className="py-3 px-4">
                                <span
                                    className={cn(
                                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
                                        netBalance >= 0
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-red-50 text-red-700"
                                    )}
                                >
                                    {netBalance >= 0 ? (
                                        <ArrowDownIcon size={11} />
                                    ) : (
                                        <ArrowUpIcon size={11} />
                                    )}
                                    {Math.abs(netBalance).toLocaleString("fr-CI", {
                                        style: "currency",
                                        currency: "XOF",
                                    })}
                                </span>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Card>
        </div>
    );
};