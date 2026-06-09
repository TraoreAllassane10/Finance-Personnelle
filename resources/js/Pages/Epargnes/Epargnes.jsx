import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ArrowUp,
    GoalIcon,
    Landmark,
    PlusCircle,
    Wallet,
    X,
} from "lucide-react";
import { depotRecent } from "@/constant";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import useCompteEpargne from "@/hooks/useCompteEpargne";
import { formatMontant } from "../lib/utils";
import useObjectifEpargne from "@/hooks/useObjectifEpargne";
import { Progress } from "@/Components/ui/progress";
import useVersement from "@/hooks/useVersement";

const Epargnes = () => {
    const { compte_epargnes, objectif_epargnes, versements } = usePage().props || [];

    const [openCompte, setOpenCompte] = useState(false);
    const [openModalObjectif, setOpenModalObjectif] = useState(false);
    const [openModalVersement, setOpenModalVersement] = useState(false);

    const [compte, setCompte] = useState("");

    const [data, setData] = useState({
        nom: "",
        montant: "",
        date_limite: null,
    });

    const [dataVersement, setDataVersement] = useState({
        date: null,
        montant: null,
        compte: "",
        objectif: "",
    });

    const handleChange = (key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const handleChangeVersement = (key, value) => {
        setDataVersement((prev) => ({ ...prev, [key]: value }));
    };

    // Enregistrement d'un compte d'epargne
    const { createCompteEpargne, isLoading: loadingCompte } =
        useCompteEpargne();
    const handleSubmitCompte = () => {
        createCompteEpargne({ nom: compte });
    };

    // Enregistrement d'un objectif d'epargne
    const { createObjectifEpargne, isLoading: loadingObjectif } =
        useObjectifEpargne();

    const canSubmitObjectif = data.nom && data.date_limite && data.montant;

    const handleSubmitObjectif = () => {
        createObjectifEpargne({
            nom: data.nom,
            montant_cible: data.montant,
            date_echeance: data.date_limite,
        });
    };

    // Enregistrement d'un versement
    const { createVersement, isLoading: loadingVersement } = useVersement();
    const canSubmitVersement =
        dataVersement.compte &&
        dataVersement.date &&
        dataVersement.montant &&
        dataVersement.objectif;

    const handleSubmitVersement = () => {
        createVersement({
            date: dataVersement.date,
            montant_verse: dataVersement.montant,
            compte_epargne_id: dataVersement.compte,
            objectif_epargne_id: dataVersement.objectif,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Epargnes" />

            {/* Modal de l'ajout d'un compte d'epargne */}
            {openCompte && (
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

                    <div className="bg-white w-[400px] rounded-lg absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                        <div className="p-4">
                            {/* Entete */}
                            <div className="flex justify-between place-items-center">
                                <h2 className="text-md font-bold text-gray-600">
                                    Ajouter un compte d'epargne
                                </h2>

                                <button onClick={() => setOpenCompte(false)}>
                                    <X className="text-gray-600" />
                                </button>
                            </div>

                            <hr className="w-full my-4 border-1 border-gray-300" />

                            {/* champs de saisie */}
                            <div className="mb-4">
                                <div className="flex flex-col gap-4">
                                    {/* Nom du compte */}
                                    <div className="w-full flex flex-col gap-2">
                                        <Label className="text-xs font-bold text-muted-foreground">
                                            Nom du compte
                                        </Label>
                                        <Input
                                            value={compte}
                                            onChange={(e) =>
                                                setCompte(e.target.value)
                                            }
                                            className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Boutons */}
                            <div>
                                <hr className="w-full my-4 border-1 border-gray-300" />

                                <div className="mt-2 flex gap-2 justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => setOpenCompte(false)}
                                        className="text-xs"
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        disabled={!compte || loadingCompte}
                                        onClick={handleSubmitCompte}
                                        className="bg-blue-600 text-white text-xs rounded-md px-2 py-2 hover:bg-blue-800 transition duration-300"
                                    >
                                        Ajouter le compte
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal du l'ajout d'un objectif d'epargne */}
            {openModalObjectif && (
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

                    <div className="bg-white w-[400px] rounded-lg absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                        <div className="p-4">
                            {/* Entete */}
                            <div className="flex justify-between place-items-center">
                                <h2 className="text-md font-bold text-gray-600">
                                    Ajouter un objectif d'epargne
                                </h2>

                                <button
                                    onClick={() => setOpenModalObjectif(false)}
                                >
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
                                                handleChange(
                                                    "nom",
                                                    e.target.value,
                                                )
                                            }
                                            className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                        />
                                    </div>

                                    {/* Montant */}
                                    <div className="w-full flex flex-col gap-2">
                                        <Label className="text-xs font-bold text-muted-foreground">
                                            Montant Cible
                                        </Label>
                                        <Input
                                            value={data.montant}
                                            onChange={(e) =>
                                                handleChange(
                                                    "montant",
                                                    e.target.value,
                                                )
                                            }
                                            type="number"
                                            className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                        />
                                    </div>

                                    {/* Date limite */}
                                    <div className="w-full flex flex-col gap-2">
                                        <Label className="text-xs font-bold text-muted-foreground">
                                            Date limite
                                        </Label>
                                        <Input
                                            value={data.date_limite}
                                            onChange={(e) =>
                                                handleChange(
                                                    "date_limite",
                                                    e.target.value,
                                                )
                                            }
                                            type="date"
                                            className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Boutons */}
                            <div>
                                <hr className="w-full my-4 border-1 border-gray-300" />

                                <div className="mt-2 flex gap-2 justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setOpenModalObjectif(false)
                                        }
                                        className="text-xs"
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        disabled={
                                            !canSubmitObjectif ||
                                            loadingObjectif
                                        }
                                        onClick={handleSubmitObjectif}
                                        className="bg-blue-600 text-white text-xs rounded-md px-2 py-2 hover:bg-blue-800 transition duration-300"
                                    >
                                        Ajouter l'objectif
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de l'ajout d'un versement */}
            {openModalVersement && (
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

                    <div className="bg-white w-[400px] rounded-lg absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                        <div className="p-4">
                            {/* Entete */}
                            <div className="flex justify-between place-items-center">
                                <h2 className="text-md font-bold text-gray-600">
                                    Ajouter un versement
                                </h2>

                                <button
                                    onClick={() => setOpenModalVersement(false)}
                                >
                                    <X className="text-gray-600" />
                                </button>
                            </div>

                            <hr className="w-full my-4 border-1 border-gray-300" />

                            {/* champs de saisie */}
                            <div className="mb-4">
                                <div className="flex flex-col gap-4">
                                    {/* Date */}
                                    <div className="w-full flex flex-col gap-2">
                                        <Label className="text-xs font-bold text-muted-foreground">
                                            Date
                                        </Label>
                                        <Input
                                            value={dataVersement.date}
                                            onChange={(e) =>
                                                handleChangeVersement(
                                                    "date",
                                                    e.target.value,
                                                )
                                            }
                                            type="date"
                                            className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                        />
                                    </div>

                                    {/* Montant */}
                                    <div className="w-full flex flex-col gap-2">
                                        <Label className="text-xs font-bold text-muted-foreground">
                                            Montant versé
                                        </Label>
                                        <Input
                                            value={dataVersement.montant}
                                            onChange={(e) =>
                                                handleChangeVersement(
                                                    "montant",
                                                    e.target.value,
                                                )
                                            }
                                            type="number"
                                            className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                        />
                                    </div>

                                    {/* Compte d'epargne */}
                                    <div className="w-full flex flex-col gap-2">
                                        <Label className="text-xs font-bold text-muted-foreground">
                                            Compte d'epargne
                                        </Label>
                                        <select
                                            value={dataVersement.compte}
                                            onChange={(e) =>
                                                handleChangeVersement(
                                                    "compte",
                                                    e.target.value,
                                                )
                                            }
                                            className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                        >
                                            <option value=""></option>
                                            {compte_epargnes.map((compte) => (
                                                <option
                                                    key={compte.id}
                                                    value={compte.id}
                                                >
                                                    {compte.nom}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Objectif d'epargne */}
                                    <div className="w-full flex flex-col gap-2">
                                        <Label className="text-xs font-bold text-muted-foreground">
                                            Objectif
                                        </Label>
                                        <select
                                            value={dataVersement.objectif}
                                            onChange={(e) =>
                                                handleChangeVersement(
                                                    "objectif",
                                                    e.target.value,
                                                )
                                            }
                                            className="h-7 py-1 text-muted-foreground placeholder:text-muted-foreground/50 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                        >
                                            <option value=""></option>
                                            {objectif_epargnes.map(
                                                (objectif) => (
                                                    <option key={objectif.id} value={objectif.id}>{objectif.nom}</option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Boutons */}
                            <div>
                                <hr className="w-full my-4 border-1 border-gray-300" />

                                <div className="mt-2 flex gap-2 justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setOpenModalVersement(false)
                                        }
                                        className="text-xs"
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        disabled={
                                            !canSubmitVersement ||
                                            loadingVersement
                                        }
                                        onClick={handleSubmitVersement}
                                        className="bg-blue-600 text-white text-xs rounded-md px-2 py-2 hover:bg-blue-800 transition duration-300"
                                    >
                                        Ajouter le versement
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Entete de la page */}
            <section className="mb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">Epargnes</h1>
                    <p className="text-sm text-muted-foreground">
                        Suivre vos comptes d'epargnes et la progression de votre
                        objectif.
                    </p>
                </div>
            </section>

            {/* Carte Total et compte actifs */}
            <section className="flex gap-4 mb-6">
                {/* Carte Total */}
                <Card className="w-1/4 p-4 bg-gradient-to-br from-white to-yellow-50">
                    <div className="flex place-items-center gap-2 mb-4">
                        <Landmark size={16} className="text-yellow-500" />
                        <span className="text-sm text-muted-foreground uppercase">
                            Total d'epargne
                        </span>
                    </div>

                    <div className="text-gray-800 font-bold text-xl">
                        15 000 000 fcfa
                    </div>

                    <div className="flex gap-2 mt-8">
                        <div className="bg-green-50 text-green-600 font-bold px-1 py-0.5 flex gap-1 justify-between items-center place-items-center rounded-md">
                            <ArrowUp /> +4.2%
                        </div>

                        <p className="text-muted-foreground">
                            {" "}
                            vs mois dernier
                        </p>
                    </div>
                </Card>

                {/* Carte de compte actifs */}
                <Card className="w-3/4">
                    <CardHeader className="border-b border-gray-200 text-gray-800 font-semibold text-xl">
                        <div className="flex items-center justify-between">
                            <h2> Comptes actifs</h2>
                            <Button
                                variant={"outline"}
                                onClick={() => setOpenCompte(true)}
                            >
                                Ajout un compte d'epargne
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="mt-2 flex gap-4">
                        {compte_epargnes.map((compte) => (
                            <div className="flex gap-2 place-items-center border border-gray-200 p-4 w-1/2 rounded-lg">
                                <div className="bg-slate-100 flex items-center justify-center p-1 rounded-sm">
                                    <Wallet className="text-yellow-500" />
                                </div>

                                <div className="flex flex-col ">
                                    <h2 className="text-gray-800 font-semibold text-xl">
                                        {compte.nom}
                                    </h2>
                                    <p className="text-muted-foreground text-xs">
                                        {formatMontant(
                                            compte.montant_total_compte
                                                ? Number(compte.montant_total_compte)
                                                : 0,
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {/* Carte objectifs et virement recent */}
            <section className="flex gap-4">
                {/* Carte des objectifs */}
                <Card className="w-[30%]">
                    <CardHeader className="border-b border-gray-200 text-gray-800 font-semibold text-xl">
                        <div className="flex items-center gap-2">
                            <GoalIcon className="text-yellow-500" />
                            <h2> Objectifs actuel</h2>
                        </div>
                    </CardHeader>

                    <CardContent className="mt-4 space-y-6">
                        {objectif_epargnes.map((objectif) => {
                            const progression =
                                objectif.montant_cible > 0
                                    ? Math.ceil(
                                          (objectif.montant_total_epargne /
                                              objectif.montant_cible) *
                                              100,
                                      )
                                    : 0;

                            return (
                                <div className="flex items-center gap-4">
                                    <div className="w-full">
                                        <h3 className="text-xl font-semibold truncate">
                                            {objectif.nom}
                                        </h3>

                                        <div className="flex justify-between text-muted-foreground text-xs">
                                            <span>
                                                {" "}
                                                {formatMontant(
                                                    objectif.montant_total_epargne ??
                                                        0,
                                                )}
                                            </span>
                                            <span>
                                                sur{" "}
                                                {formatMontant(
                                                    objectif.montant_cible,
                                                )}
                                            </span>
                                        </div>

                                        <Progress
                                            value={progression}
                                            classNameIndicator="bg-green-600"
                                            id="progress-upload"
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <Button
                            variant={"outline"}
                            className="w-full flex gap-2"
                            onClick={() => setOpenModalObjectif(true)}
                        >
                            <PlusCircle />
                            creer un nouvel objectif
                        </Button>
                    </CardContent>
                </Card>

                {/* Carte des dépôts recents */}
                <Card className="w-[70%]">
                    <CardHeader className="border-b border-gray-200 text-gray-800 font-semibold text-xl">
                        <div className="flex justify-between">
                            <h2>Dépôts récents</h2>
                            <Button
                                variant={"outline"}
                                onClick={() => setOpenModalVersement(true)}
                            >
                                Ajouter un versement
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="mt-2 flex gap-4">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold text-muted-foreground">
                                        DATE
                                    </TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">
                                        COMPTE
                                    </TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">
                                        MONTANT
                                    </TableHead>
                                </TableRow>
                                {versements.map((data) => (
                                    <TableRow key={data.id}>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                data.date,
                                            ).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell className="text-muted-foreground">
                                            {data.compte.nom}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            <span className={` font-bold`}>
                                                {data.montant_verse.toLocaleString(
                                                    "fr-CI",
                                                    {
                                                        style: "currency",
                                                        currency: "XOF",
                                                    },
                                                )}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableHeader>
                        </Table>
                    </CardContent>
                </Card>
            </section>
        </AuthenticatedLayout>
    );
};

export default Epargnes;
