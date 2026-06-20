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
import { router } from "@inertiajs/react";
import useCategorie from "@/hooks/useCategorie";
import useTransactionRecurrente from "@/hooks/useTransactionRecurrente";

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

    // Recuperation des categories lors du montage du composant
    useEffect(() => {
        async function fethCategories() {
            const data = await getCategories();
            setCategories(data);
        }

        fethCategories();
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

    if (isLoadingCategorie) {
        return (
            <div className="fixed inset-0 z-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

                <Loader2 className=" animate-spin" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

            <div className="bg-white w-[400px] rounded-lg absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                <div className="p-4">
                    {/* Entete */}
                    <div className="flex justify-between place-items-center">
                        <h2 className="text-md font-bold text-gray-600">
                            Ajouter une transaction récurrente
                        </h2>

                        <button onClick={() => setOpenModal(false)}>
                            <X className="text-gray-600" />
                        </button>
                    </div>

                    <hr className="w-full my-4 border-1 border-gray-300" />

                    {/* Tabs de choix */}
                    <div className="w-full bg-gray-100 rounded-lg p-1 mb-4">
                        <div className="flex">
                            <button
                                onClick={() => {
                                    handleChange("type", "depense");
                                }}
                                className={`w-1/2 py-1 text-sm font-medium text-gray-600 rounded-md transition duration-100 shadow-sm ${data.type === "depense" && "bg-white"}`}
                            >
                                Dépense
                            </button>
                            <button
                                onClick={() => {
                                    handleChange("type", "revenu");
                                }}
                                className={`w-1/2  text-sm font-medium text-gray-600 rounded-md transition duration-100 shadow-sm ${data.type === "revenu" && "bg-white"}`}
                            >
                                Revenu
                            </button>
                        </div>
                    </div>

                    {/* champs de saisie */}
                    <div className="mb-4">
                        <div className="flex flex-col gap-4">
                            {/* Montant */}
                            <div className="w-full flex flex-col gap-2">
                                <Label className="text-xs font-bold text-muted-foreground">
                                    Montant
                                </Label>
                                <Input
                                    value={data.montant}
                                    onChange={(e) =>
                                        handleChange("montant", e.target.value)
                                    }
                                    type="number"
                                    placeholder="10000"
                                    className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                />
                            </div>

                            {/* Date Echeance */}
                            <div className="flex flex-col gap-2 ">
                                <Label className="text-xs font-bold text-muted-foreground">
                                    Date d'echéance
                                </Label>
                                <Input
                                    type="date"
                                    value={data.date_echeance}
                                    onChange={(e) =>
                                        handleChange(
                                            "date_echeance",
                                            e.target.value,
                                        )
                                    }
                                    className="h-7 py-1 text-sm text-muted-foreground  border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                />
                            </div>

                            {/* Categorie */}
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-col gap-2">
                                    <Label className="text-xs font-bold text-muted-foreground">
                                        Categorie
                                    </Label>

                                    <Select
                                        value={data.category_id}
                                        onValueChange={(value) =>
                                            handleChange("category_id", value)
                                        }
                                        className="h-7 text-sm text-muted-foreground border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Sélectionner une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories
                                                .filter(
                                                    (c) => c.type === data.type,
                                                )
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
                            <div className="w-full flex flex-col gap-2">
                                <Label className="text-xs font-bold text-muted-foreground">
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    value={data.description}
                                    onChange={(e) =>
                                        handleChange(
                                            "description",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Ex: Courses hebdomadaires"
                                    className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                />
                            </div>

                            {/* Frequence */}
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-col gap-2">
                                    <Label className="text-xs font-bold text-muted-foreground">
                                        Frequence
                                    </Label>

                                    <Select
                                        value={data.frequence}
                                        onValueChange={(value) =>
                                            handleChange("frequence", value)
                                        }
                                        className="h-7 text-sm text-muted-foreground border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Sélectionner une frequence" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {frequences.map((fq) => (
                                                <SelectItem value={fq}>
                                                    {fq}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                disabled={!canSubmit || isLoading}
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white text-xs rounded-md px-2 py-2 hover:bg-blue-800 transition duration-300"
                            >
                                Ajouter une transaction
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalTransactionRecurrente;
