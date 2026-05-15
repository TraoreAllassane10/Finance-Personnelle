import { Banknote, Car, Salad, ShoppingBag, Wallet, X } from "lucide-react";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { categories } from "@/constant";

const AddBudgetModal = ({ setOpenModal }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md">
                <div className="bg-white w-[400px] rounded-lg absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                    <div className="p-4">
                        {/* Entete */}
                        <div className="flex justify-between place-items-center">
                            <h2 className="text-md font-bold text-gray-600">
                                Définir un budget
                            </h2>

                            <button onClick={() => setOpenModal(false)}>
                                <X className="text-gray-600" />
                            </button>
                        </div>

                        <hr className="w-full my-4 border-1 border-gray-300" />

                        {/* champs de saisie */}
                        <div className="mb-4">
                            <div className="flex flex-col gap-4">
                                {/* Nom */}
                                <div className="w-full flex flex-col gap-2">
                                    <Label className="text-xs font-bold text-muted-foreground">
                                        Montant à allouer
                                    </Label>
                                    <Input
                                        type="number"
                                        placeholder="Ex: 50000"
                                        className="h-7 py-1 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                    />
                                </div>

                                {/* Type de categorie */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-xs font-bold text-muted-foreground">
                                            Catégorie
                                        </Label>

                                        <Select className="h-7 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Sélectionner le type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories
                                                    .filter(
                                                        (c) =>
                                                            c.type ===
                                                            "depense",
                                                    )
                                                    .map((categorie) => (
                                                        <SelectItem value={categorie.name}>
                                                            {categorie.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Boutons */}
                        <div>
                            <hr className="w-full my-4 border-1 border-gray-300" />

                            <div className="mt-2 flex gap-2 justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setOpenModal(false)}
                                    className="text-xs"
                                >
                                    Annuler
                                </Button>
                                <Button className="bg-blue-600 text-white text-xs rounded-md px-2 py-2 hover:bg-blue-800 transition duration-300">
                                    Ajouter une transaction
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBudgetModal;
