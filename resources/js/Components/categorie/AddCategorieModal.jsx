import {
    Car,
    House,
    Briefcase,
    CreditCard,
    ShoppingCart,
    HeartPulse,
    Gamepad2,
    Smartphone,
    PiggyBank,
    UtensilsCrossed,
    Plane,
    RefreshCw,
    X,
} from "lucide-react";
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
    { hex: "#22c55e", label: "Revenu" },
    { hex: "#ef4444", label: "Dépense" },
    { hex: "#3b82f6", label: "Bleu" },
    { hex: "#8b5cf6", label: "Violet" },
    { hex: "#f59e0b", label: "Ambre" },
    { hex: "#ec4899", label: "Rose" },
    { hex: "#14b8a6", label: "Cyan" },
    { hex: "#f97316", label: "Orange" },
    { hex: "#64748b", label: "Ardoise" },
    { hex: "#a3e635", label: "Lime" },
    { hex: "#06b6d4", label: "Ciel" },
    { hex: "#e11d48", label: "Cramoisie" },
];

const icons = [
    { name: "Salaire", component: Briefcase },
    { name: "Carte", component: CreditCard },
    { name: "Courses", component: ShoppingCart },
    { name: "Transport", component: Car },
    { name: "Logement", component: House },
    { name: "Santé", component: HeartPulse },
    { name: "Loisirs", component: Gamepad2 },
    { name: "Téléphone", component: Smartphone },
    { name: "Épargne", component: PiggyBank },
    { name: "Restaurant", component: UtensilsCrossed },
    { name: "Voyage", component: Plane },
    { name: "Abonnements", component: RefreshCw },
];

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
                                <div className="flex flex-wrap gap-2">
                                    {couleurs.map(({ hex, label }) => (
                                        <div
                                            key={hex}
                                            onClick={() =>
                                                handleChange("couleur", hex)
                                            }
                                            title={label}
                                            className="relative w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform"
                                            style={{ backgroundColor: hex }}
                                        >
                                            {data.couleur === hex && (
                                                <span className="absolute inset-0 flex items-center justify-center">
                                                    <span className="w-3 h-3 rounded-full bg-white opacity-90 shadow-sm" />
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Choix d'icon */}
                                <div className="flex flex-wrap gap-2">
                                    {icons.map(({ name, component: Icon }) => (
                                        <div
                                            key={name}
                                            onClick={() =>
                                                handleChange(
                                                    "icon",
                                                    Icon.displayName,
                                                )
                                            }
                                            title={name}
                                            className={cn(
                                                "w-11 h-11 flex flex-col items-center justify-center gap-0.5 rounded-lg cursor-pointer border transition",
                                                data.icon === Icon.displayName
                                                    ? "border-blue-500 bg-blue-50 text-blue-600"
                                                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300",
                                            )}
                                        >
                                            <Icon size={20} />
                                            <span className="text-[8px] leading-tight text-center">
                                                {name}
                                            </span>
                                        </div>
                                    ))}
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
