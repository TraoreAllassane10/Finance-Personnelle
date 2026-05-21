import AddBudgetModal from "@/Components/budget/AddBudgetModal";
import BudgetCard from "@/Components/budget/BudgetCard";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    CircleAlert,
    SlidersHorizontal,
    TrendingDown,
    TrendingUp,
    TriangleAlert,
} from "lucide-react";
import React, { useState } from "react";
import { formatMontant } from "../lib/utils";

const Index = () => {
    const { categories, budgets, montantTotalBudget, montantTotalDepense } =
        usePage().props;

    console.log(budgets);

    const [openModal, setOpenModal] = useState(false);

    // Calcul du montant restant
    const montantRestant =
        Number(montantTotalBudget) - Number(montantTotalDepense);

    // Calcule de la progression
    const progression =
        montantTotalBudget > 0
            ? Math.ceil((montantTotalDepense * 100) / montantTotalBudget)
            : 0;

    let nombreBudgetProgressionSuperieur80 = 0;
    let nombreBudgetProgressionSuperieur100 = 0;

    budgets.forEach((budget) => {
        const progression =
            budget.montant_alloue > 0
                ? Math.ceil(
                      (Number(budget.category.montant_depense) * 100) /
                          budget.montant_alloue,
                  )
                : 0;

        // Hors budget
        if (progression > 100) {
            nombreBudgetProgressionSuperieur100 += 1;
        } // Limite proche
        else if (progression > 80 && progression < 100) {
            nombreBudgetProgressionSuperieur80 += 1;
        }
    });

    return (
        <AuthenticatedLayout>
            <Head title="Budget" />

            {/* Modal de définition de budget */}
            {openModal && (
                <AddBudgetModal
                    categories={categories}
                    setOpenModal={setOpenModal}
                />
            )}

            {/* Entete de la page */}
            <section className="flex justify-between place-items-center mb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">
                        Gestionnaire de Budget Mensuel
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Suivez et gerez vos allocations par catégorie pour ce
                        mois.
                    </p>
                </div>

                <Button variant={"outline"} onClick={() => setOpenModal(true)}>
                    <SlidersHorizontal />
                    Definir les budgets
                </Button>
            </section>

            {/* Vue d'ensemble */}
            <section className="flex gap-6 mb-6">
                <Card className="w-[70%]">
                    <CardHeader className="border border-gray-200">
                        <div className="flex place-items-center justify-between">
                            <div>
                                <CardTitle>Budget Mensuel Total</CardTitle>
                                <CardDescription>
                                    Toutes catégories confondues
                                </CardDescription>
                            </div>

                            {Number(montantRestant) < 0 ? (
                                <div className="flex gap-2 bg-red-100 text-red-600 text-xs px-1 py-0.5 font-bold place-items-center rounded-xl">
                                    <TrendingDown size={16} /> Hors budget
                                </div>
                            ) : (
                                <div className="flex gap-2 bg-green-100 text-green-600 text-xs px-1 py-0.5 font-bold place-items-center rounded-xl">
                                    <TrendingUp size={16} /> En bonne voie
                                </div>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="mt-10"></CardContent>

                    <CardFooter className="flex flex-col items-start">
                        <Field className="w-full">
                            <FieldLabel htmlFor="progress-upload">
                                <span className="text-muted-foreground">
                                    Dépensé
                                </span>
                                <span className="ml-auto font-bold">
                                    {formatMontant(montantTotalDepense)}
                                </span>
                            </FieldLabel>
                            <Progress
                                value={progression}
                                id="progress-upload"
                                className="h-3"
                                classNameIndicator="bg-blue-600"
                            />
                        </Field>

                        <div className="flex justify-between w-full">
                            <p className="text-muted-foreground">
                                Total alloué :{" "}
                                {formatMontant(montantTotalBudget)}
                            </p>
                            <p
                                className={
                                    Number(montantRestant) < 0
                                        ? "text-red-600"
                                        : "text-green-600"
                                }
                            >
                                Restant : {formatMontant(montantRestant)}
                            </p>
                        </div>
                    </CardFooter>
                </Card>

                <div className="flex flex-col gap-8 w-[30%]">
                    <Card className="p-4">
                        <div className="flex gap-2 place-items-center text-sm text-muted-foreground">
                            <TriangleAlert
                                size={16}
                                className="text-yellow-500"
                            />{" "}
                            Limite proche
                        </div>

                        <p className="text-2xl font-bold">
                            {nombreBudgetProgressionSuperieur80}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Categorie {">"} 80
                        </p>
                    </Card>

                    <Card className="p-4">
                        <div className="flex gap-2 place-items-center text-sm text-muted-foreground">
                            <CircleAlert
                                size={16}
                                className="text-yellow-500"
                            />{" "}
                            Hors budget
                        </div>

                        <p className="text-2xl font-bold">
                            {nombreBudgetProgressionSuperieur100}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Categorie {">"} 100
                        </p>
                    </Card>
                </div>
            </section>

            {/* Repartition par categorie */}
            <section>
                <h2 className="text-xl font-semibold mb-6">
                    Répartition par catégorie
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {budgets.map((budget) => (
                        <BudgetCard key={budget.id} budget={budget} />
                    ))}
                </div>
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;
