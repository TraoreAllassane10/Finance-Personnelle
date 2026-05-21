import { Banknote, Car, House, Salad, ShoppingBag, Wallet, Wifi, X } from "lucide-react";
import React, { useState } from "react";
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
import { cn } from "@/lib/utils";
import useCategorie from "@/hooks/useCategorie";

const couleurs = [
    "#25ced1",
    "#c5dca0",
    "#818aa3",
    "#fff07c",
    "#3a506b",
    "#ff5154",
    "#83e8ba",
    "#3c3c3c",
    "#ff8c42",
];

const icons = [Wallet, Banknote, Salad, Car, ShoppingBag, House, Wifi];

const AddCategorieModal = ({ setOpenModal }) => {
    const [data, setData] = useState({
        nom: "",
        type: "",
        couleur: "",
        icon: "",
    });

    let canSubmit = data.nom && data.type && data.couleur && data.icon;

    const { createCategorie, isLoading } = useCategorie();

    const handleChange = (key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    // Ajout d'une categorie
    const handleSubmit = () => {
        createCategorie(data);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md">
                <div className="bg-white w-[400px] rounded-lg absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                    <div className="p-4">
                        {/* Entete */}
                        <div className="flex justify-between place-items-center">
                            <h2 className="text-md font-bold text-gray-600">
                                Ajouter une catégorie
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
                                        Nom
                                    </Label>
                                    <Input
                                        value={data.nom}
                                        onChange={(e) =>
                                            handleChange("nom", e.target.value)
                                        }
                                        placeholder="Ex: Alimentation"
                                        className="h-7 py-1 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                    />
                                </div>

                                {/* Type de categorie */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-xs font-bold text-muted-foreground">
                                            Type de catégorie
                                        </Label>

                                        <Select
                                            value={data.type}
                                            onValueChange={(value) =>
                                                handleChange("type", value)
                                            }
                                            className="h-7 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Sélectionner le type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="revenu">
                                                    Revenu
                                                </SelectItem>
                                                <SelectItem value="depense">
                                                    Dépense
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Choix couleur */}
                                <div className="w-full flex flex-col gap-2">
                                    <Label className="text-xs font-bold text-muted-foreground">
                                        Couleur
                                    </Label>

                                    <div className="flex gap-2">
                                        {couleurs.map((couleur) => (
                                            <div
                                                onClick={() =>
                                                    handleChange(
                                                        "couleur",
                                                        couleur,
                                                    )
                                                }
                                                className={cn(
                                                    "w-8 h-8 rounded-full cursor-pointer",
                                                    data.couleur === couleur &&
                                                        "border-4 border-blue-600",
                                                )}
                                                style={{
                                                    backgroundColor: couleur,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Choix d'icon */}
                                <div className="w-full flex flex-col gap-2">
                                    <Label className="text-xs font-bold text-muted-foreground">
                                        Icon
                                    </Label>

                                    <div className="flex gap-4 items-center place-items-center">
                                        {icons.map((icon) => {
                                            const Icon = icon;

                                            return (
                                                <Icon
                                                    onClick={() =>
                                                        handleChange(
                                                            "icon",
                                                            icon.displayName,
                                                        )
                                                    }
                                                    className={cn(
                                                        "cursor-pointer",
                                                        data.icon ==
                                                            icon.displayName &&
                                                            "text-blue-600",
                                                    )}
                                                    size={32}
                                                />
                                            );
                                        })}
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

                                <Button
                                    onClick={handleSubmit}
                                    disabled={!canSubmit || isLoading}
                                    className="bg-blue-600 text-white text-xs rounded-md px-2 py-2 hover:bg-blue-800 transition duration-300"
                                >
                                    {isLoading
                                        ? "Enregistrement..."
                                        : "Ajouter une transaction"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategorieModal;
