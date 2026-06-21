import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import useTransaction from "@/hooks/useTransaction";
import { router } from "@inertiajs/react";
import useCategorie from "@/hooks/useCategorie";
import { cn } from "@/lib/utils";

const ModalTransactionUpdate = ({ updateTransactionId, setOpenModal }) => {
    const [categories, setCategories] = useState([]);

    const [data, setData] = useState({
        type: "depense",
        montant: null,
        date: "",
        category_id: "",
        description: "",
        note: "",
    });

    let canSubmit =
        data.type &&
        data.montant &&
        data.date &&
        data.category_id &&
        data.description;

    const handleChange = (key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const { updateTransaction, getTransaction, isLoading } = useTransaction();
    const { getCategories, isLoading: isLoadingCategorie } = useCategorie();

    useEffect(() => {
        async function fetchCategories() {
            const data = await getCategories();
            setCategories(data);
        }

        async function fetchTransaction() {
            const data = await getTransaction(updateTransactionId);
            setData({
                date: data?.date,
                montant: data?.montant,
                type: data?.type,
                description: data?.description,
                category_id: data?.category_id,
                note: data?.note,
            });
        }

        fetchCategories();
        fetchTransaction();
    }, []);

    const handleSubmit = async () => {
        await updateTransaction(updateTransactionId, data);
        setData({
            type: "depense",
            montant: null,
            date: "",
            category_id: "",
            description: "",
            note: "",
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
                            Modifier la transaction
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Modifiez les informations ci-dessous
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

                    {/* Badge type — lecture seule en mode édition */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Type :</span>
                        <span
                            className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium",
                                data.type === "revenu"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-red-50 text-red-700"
                            )}
                        >
                            {data.type === "revenu" ? "Revenu" : "Dépense"}
                        </span>
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

                    {/* Date + Catégorie */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">
                                Date
                            </Label>
                            <Input
                                type="date"
                                value={data.date}
                                onChange={(e) => handleChange("date", e.target.value)}
                                className={fieldClass}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">
                                Catégorie
                            </Label>
                            <Select
                                value={data.category_id}
                                onValueChange={(value) => handleChange("category_id", value)}
                            >
                                <SelectTrigger className={cn(fieldClass, "w-full")}>
                                    <SelectValue placeholder="Sélectionner" />
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
                            placeholder="Ex: Courses hebdomadaires"
                            className={fieldClass}
                        />
                    </div>

                    {/* Note */}
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">
                            Note
                            <span className="ml-1 text-muted-foreground/60 font-normal">
                                (optionnel)
                            </span>
                        </Label>
                        <Textarea
                            rows={3}
                            value={data.note}
                            onChange={(e) => handleChange("note", e.target.value)}
                            placeholder="Ex: Fruits et légumes pour la semaine"
                            className="text-sm text-foreground placeholder:text-muted-foreground/50 border-border/60 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-lg transition resize-none"
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
                        {isLoading ? "Modification..." : "Modifier"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModalTransactionUpdate;