import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import {
    Banknote,
    Briefcase,
    Car,
    CreditCard,
    Gamepad2,
    HeartPulse,
    House,
    MoreHorizontalIcon,
    MoreVerticalIcon,
    Option,
    PiggyBank,
    Plane,
    RefreshCw,
    Salad,
    ShoppingBag,
    ShoppingCart,
    Smartphone,
    UtensilsCrossed,
    Wallet,
    Wifi,
} from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useBudget from "@/hooks/useBudget";

const ConfigIcon = {
    Briefcase: Briefcase,
    CreditCard: CreditCard,
    ShoppingCart: ShoppingCart,
    Car: Car,
    House: House,
    HeartPulse: HeartPulse,
    Gamepad2: Gamepad2,
    Smartphone: Smartphone,
    PiggyBank: PiggyBank,
    UtensilsCrossed: UtensilsCrossed,
    Plane: Plane,
    RefreshCw: RefreshCw,
    Salad: Salad,
    Banknote: Banknote,
    ShoppingBag: ShoppingBag,
    Wallet: Wallet,
    Wifi: Wifi
};

const BudgetCard = ({ budget }) => {
    // Icon de la categorie
    const Icon = ConfigIcon[budget.category?.icon];

    // Calcule de la progression
    const progression =
        budget.montant_alloue > 0
            ? Math.ceil(
                  (budget.category.montant_depense * 100) /
                      budget.montant_alloue,
              )
            : 0;

    // Recuperation du sytle de l'indicateur
    const [bgColor] = getSytleIndicator(progression);

    // Calcule du montant restant
    const montant_restant =
        budget.montant_alloue - budget.category.montant_depense;

    // Suppression d'un budget
    const { deleteBudget } = useBudget();

    const handleDelete = () => {
        deleteBudget(budget.id);
    };

    return (
        <Card>
            <CardHeader className="border-b">
                <div className="flex items-center justify-between place-items-center">
                    <div className="flex gap-4 place-items-center">
                        <div
                            className={`p-1 flex justify-center rounded-lg`}
                            style={{ backgroundColor: budget.category.couleur }}
                        >
                            <Icon className={`text-white`} />
                        </div>

                        <span className="text-xl font-semibold">
                            {budget.category?.nom}
                        </span>
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
                                <DropdownMenuItem onClick={handleDelete}>
                                    Supprimer
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="mt-4">
                <Field className="w-full max-w-sm">
                    <FieldLabel htmlFor="progress-upload">
                        <span className="text-xl font-bold">
                            {budget.montant_alloue.toLocaleString("fr-CI", {
                                style: "currency",
                                currency: "XOF",
                            })}
                        </span>
                    </FieldLabel>
                    <Progress
                        value={progression > 100 ? 100 : progression}
                        id="progress-upload"
                        classNameIndicator={bgColor}
                    />
                </Field>

                <div className="flex justify-between text-sm font-medium mt-4">
                    <p className="text-muted-foreground">Restant</p>
                    <p
                        className={
                            progression > 100
                                ? "text-red-600"
                                : "text-green-600"
                        }
                    >
                        {montant_restant.toLocaleString("fr-CI", {
                            style: "currency",
                            currency: "XOF",
                        })}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default BudgetCard;

const getSytleIndicator = (progression) => {
    if (progression > 0 && progression <= 100) {
        return ["bg-green-500"];
    } else {
        return ["bg-red-600"];
    }
};
