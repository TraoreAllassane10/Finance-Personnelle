import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";
import useCategorie from "@/hooks/useCategorie";
import useTransactionRecurrente from "@/hooks/useTransactionRecurrente";
import { cn } from "@/lib/utils";

const ModalTransactionRecurrente = ({ frequences, setOpenModal }) => {
    const [categories, setCategories] = useState([]);

    const [data, setData] = useState({
        type: "depense",
        montant: null,
        date_echeance: "",
        category_id: "",
        description: "",
        frequence: "",
    });

    let canSubmit =
        data.type &&
        data.montant &&
        data.date_echeance &&
        data.category_id &&
        data.description &&
        data.frequence;

    const handleChange = (key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const { createTransaction, isLoading } = useTransactionRecurrente();
    const { getCategories, isLoading: isLoadingCategorie } = useCategorie();

    useEffect(() => {
        async function fetchCategories() {
            const data = await getCategories();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        setData({
            type: data.type,
            montant: "",
            date_echeance: "",
            category_id: "",
            description: "",
            frequence: "",
        });
    }, [data.type]);

    const handleSubmit = async () => {
        await createTransaction(data);
        setData({
            type: "depense",
            montant: null,
            date_echeance: "",
            category_id: "",
            description: "",
            frequence: "",
        });
        setOpenModal(false);
        router.reload(0);
    };

    const fieldClass =
        "h-9 text-sm text-foreground placeholder:text-muted-foreground/50 border-border/60 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-lg transition";

    if (isLoadingCategorie) {
        return (
            <div className="fixed inset-0 z-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <Loader2 className="animate-spin text-white" size={24} />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpenModal(false)}
            />

            <div className="bg-background w-[420px] rounded-xl border border-border/60 shadow-lg absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
                    <div>
                        <h2 className="text-sm font-semibold text-foreground">
                            Nouvelle transaction récurrente
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Définissez une transaction automatique
                        </p>
                    </div>
                    <button
                        onClick={() => setOpenModal(false)}
                        className="size-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>

                <div className="px-5 py-4 space-y-4">

                    {/* Toggle type */}
                    <div className="w-full bg-muted rounded-lg p-1">
                        <div className="flex gap-1">
                            {[
                                { value: "depense", label: "Dépense" },
                                { value: "revenu", label: "Revenu" },
                            ].map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => handleChange("type", tab.value)}
                                    className={cn(
                                        "flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-150",
                                        data.type === tab.value
                                            ? tab.value === "depense"
                                                ? "bg-background text-red-600 shadow-sm border border-border/50"
                                                : "bg-background text-emerald-600 shadow-sm border border-border/50"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Montant */}
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Montant
                        </Label>
                        <Input
                            value={data.montant}
                            onChange={(e) => handleChange("montant", e.target.value)}
                            type="number"
                            placeholder="10 000"
                            className={fieldClass}
                        />
                    </div>

                    {/* Date échéance + Fréquence */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">
                                Date d'échéance
                            </Label>
                            <Input
                                type="date"
                                value={data.date_echeance}
                                onChange={(e) => handleChange("date_echeance", e.target.value)}
                                className={fieldClass}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">
                                Fréquence
                            </Label>
                            <Select
                                value={data.frequence}
                                onValueChange={(value) => handleChange("frequence", value)}
                            >
                                <SelectTrigger className={cn(fieldClass, "w-full")}>
                                    <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                                <SelectContent>
                                    {frequences.map((fq) => (
                                        <SelectItem key={fq} value={fq}>
                                            {fq}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Catégorie */}
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Catégorie
                        </Label>
                        <Select
                            value={data.category_id}
                            onValueChange={(value) => handleChange("category_id", value)}
                        >
                            <SelectTrigger className={cn(fieldClass, "w-full")}>
                                <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories
                                    .filter((c) => c.type === data.type)
                                    .map((categorie) => (
                                        <SelectItem
                                            value={categorie.id}
                                            key={categorie.id}
                                        >
                                            {categorie.nom}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Description
                        </Label>
                        <Input
                            type="text"
                            value={data.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Ex: Abonnement Netflix"
                            className={fieldClass}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border/60 bg-muted/30 rounded-b-xl">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setOpenModal(false)}
                        className="text-xs h-8 border border-border/50"
                    >
                        Annuler
                    </Button>
                    <Button
                        size="sm"
                        disabled={!canSubmit || isLoading}
                        onClick={handleSubmit}
                        className="text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
                    >
                        {isLoading && <Loader2 size={12} className="animate-spin" />}
                        Ajouter
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModalTransactionRecurrente;