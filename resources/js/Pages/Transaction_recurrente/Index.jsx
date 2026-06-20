import ModalTransactionRecurrente from "@/Components/transaction/ModalTransactionRecurrente";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
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

const Index = () => {
    const { transactions, frequences } = usePage().props;

    const [openModal, setOpenModal] = useState(false);

    const handleDelete = () => {

    }

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
                        <Card key={transaction.id}>
                            <CardHeader className="border-b ">
                               <div className="flex items-center justify-between">

                                 <div className="flex items-center place-items-center gap-4">
                                    {/* Icon */}
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white`}
                                        style={{
                                            backgroundColor:
                                                transaction.category.couleur,
                                        }}
                                    >
                                        <Icon size={16} />
                                    </div>

                                    {/* Nom */}
                                    <div className="flex gap-2 place-items-center">
                                        <p className="text-md font-semibold text-gray-900">
                                            {transaction.category.nom}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8"
                                            >
                                                <MoreVerticalIcon />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={handleDelete}
                                            >
                                                Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                               </div>
                            </CardHeader>

                            <CardContent className="py-4">
                                {/* Frequence */}
                                <div className="px-1 py-0.5 flex items-center justify-center text-xs bg-green-500/10 text-green-600 font-semibold rounded-sm">
                                    {transaction.frequence}
                                </div>

                                {/* NOmbre de transaction */}
                                <div className="mb-4">
                                    <p className="text-slate-600 font-bold text-xl">
                                        {formatMontant(transaction.montant)}
                                    </p>
                                </div>

                                <div>
                                    {transaction.active ? (
                                        <PauseIcon
                                            size={20}
                                            className=" size-8 p-2 bg-red-400/30 rounded-full text-red-600 cursor-pointer hover:scale-105 transition-transform duration-200"
                                        />
                                    ) : (
                                        <PlayIcon
                                            size={20}
                                            className="size-8 p-2 bg-green-400/30 text-green-600 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200"
                                        />
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
