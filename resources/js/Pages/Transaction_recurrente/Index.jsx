import ModalTransactionRecurrente from "@/Components/transaction/ModalTransactionRecurrente";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, usePage } from "@inertiajs/react";
import {
    MoreVerticalIcon,
    PauseIcon,
    PlayIcon,
    SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { formatMontant } from "../lib/utils";
import { ConfigIcon } from "../lib/assets";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import useTransactionRecurrente from "@/hooks/useTransactionRecurrente";

const Index = () => {
    const { transactions, frequences } = usePage().props;

    const [openModal, setOpenModal] = useState(false);
    const {deleteTransaction} = useTransactionRecurrente()

    const handleDelete = (id) => {
        deleteTransaction(id);

        router.visit("/transaction-recurrentes")
    };

    return (
        <AuthenticatedLayout>
            {/* Modal creation d'une transaction recurrente */}
            {openModal && (
                <ModalTransactionRecurrente
                    frequences={frequences}
                    setOpenModal={setOpenModal}
                />
            )}

            {/* Entete de la page */}
            <section className="flex justify-between gap-4 place-items-center mb-6">
                <div className="space-y-1">
                    <h1 className="text-sm md:text-3xl font-bold">
                        Gestionnaire des transactions récurrentes
                    </h1>
                    <p className="text-xs md:text-sm text-muted-foreground">
                        Suivez et gerez vos transactions récurrentes.
                    </p>
                </div>

                <Button variant={"outline"} onClick={() => setOpenModal(true)}>
                    <SlidersHorizontal />
                    Definir les transactions
                </Button>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {transactions.map((transaction) => {
                    const Icon = ConfigIcon[transaction.category.icon];

                    return (
                        <Card
                            key={transaction.id}
                            className="border border-border/60 shadow-none rounded-xl overflow-hidden hover:border-border/80 transition-colors duration-150"
                        >
                            <CardHeader className="px-4 py-3 border-b border-border/60 bg-muted/30">
                                <div className="flex items-center justify-between">
                                    {/* Icône + nom catégorie */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                                            style={{
                                                backgroundColor:
                                                    transaction.category
                                                        .couleur,
                                            }}
                                        >
                                            <Icon size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">
                                                {transaction.category.nom}
                                            </p>
                                            <span
                                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                                                style={{
                                                    backgroundColor:
                                                        transaction.category
                                                            .couleur + "18",
                                                    color: transaction.category
                                                        .couleur,
                                                }}
                                            >
                                                {transaction.frequence}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Menu actions */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-7 text-muted-foreground hover:text-foreground"
                                            >
                                                <MoreVerticalIcon size={15} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => handleDelete(transaction.id)}
                                                variant="destructive"
                                            >
                                                Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>

                            <CardContent className="px-4 py-4 space-y-4">
                                {/* Montant */}
                                <div>
                                    <p className="text-[11px] text-muted-foreground mb-0.5">
                                        Montant par échéance
                                    </p>
                                    <p className="text-xl font-semibold text-foreground">
                                        {formatMontant(transaction.montant)}
                                    </p>
                                </div>

                                {/* Statut + action */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium",
                                            transaction.active
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-muted text-muted-foreground",
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "size-1.5 rounded-full",
                                                transaction.active
                                                    ? "bg-emerald-500"
                                                    : "bg-muted-foreground",
                                            )}
                                        />
                                        {transaction.active
                                            ? "Active"
                                            : "En pause"}
                                    </span>

                                    {transaction.active ? (
                                        <button
                                            className="size-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 transition-colors duration-150"
                                            title="Mettre en pause"
                                        >
                                            <PauseIcon size={13} />
                                        </button>
                                    ) : (
                                        <button
                                            className="size-8 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 transition-colors duration-150"
                                            title="Reprendre"
                                        >
                                            <PlayIcon size={13} />
                                        </button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;
