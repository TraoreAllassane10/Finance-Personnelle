import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    Pie,
    PieChart,
    Legend,
    Label,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CardStatistiques from "@/Components/dashboard/CardStatistiques";
import { useEffect, useState } from "react";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/Components/ui/progress";
import {
    ArrowDown,
    ArrowUp,
    Landmark,
    PiggyBank,
    TrendingDown,
    TrendingUp,
} from "lucide-react";
import { formatMontant } from "./lib/utils";

// Données pour le graphique Revenu - Depense
export const description = "An interactive area chart";

const chartConfig = {
    DepenseVsRevenu: {
        label: "Depense vs Revenu",
    },
    revenu: {
        label: "Revenu",
        color: "#5661fe",
    },
    depense: {
        label: "Depense",
        color: "#6F00FF",
    },
};

const chartConfig2 = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "#5661fe",
    },
    safari: {
        label: "Safari",
        color: "#8B5CF6",
    },
    firefox: {
        label: "Firefox",
        color: "#F59E0B",
    },
    edge: {
        label: "Edge",
        color: "#EF4444",
    },
    other: {
        label: "Other",
        color: "#6B7280",
    },
};

export default function Dashboard() {
    const {
        totalRevenu,
        totalDepense,
        soldeNet,
        totalEpargne,
        recenteTransactions,
        chartData,
        periodeSelected
    } = usePage().props;

    const [periode, setPeriode] = useState(periodeSelected ?? "mois");

    const dashbaordStats = [
        {
            nom: "Total des revenus",
            montant: totalRevenu,
            icon: TrendingUp,
            bgColor: "bg-green-100",
            color: "text-green-600",
            trend: "up",
            trendColor: "text-green-600",
            trendIcon: ArrowUp,
            trendText: "5% par rapport au mois dernier",
        },
        {
            nom: "Total des dépenses",
            montant: totalDepense,
            icon: TrendingDown,
            bgColor: "bg-red-100",
            color: "text-red-600",
            trend: "down",
            trendColor: "text-red-600",
            trendIcon: ArrowDown,
            trendText: "10% par rapport au mois dernier",
        },
        {
            nom: "Solde Net",
            montant: soldeNet,
            icon: Landmark,
            bgColor: "bg-blue-100",
            color: "text-blue-600",
            text: "Solde disponible apres depenses",
        },
        {
            nom: "Epargnes",
            montant: totalEpargne,
            icon: PiggyBank,
            bgColor: "bg-purple-100",
            color: "text-purple-600",
            text: "Epargnes totales",
        },
    ];

    const [timeRange, setTimeRange] = useState("30d");

    const filteredData = chartData.transactionParDate.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date("2026-06-03");
        let daysToSubtract = 30;

        if (timeRange === "7d") {
            daysToSubtract = 7;
        } else if (timeRange === "90d") {
            daysToSubtract = 90;
        }
        const startDate = new Date(referenceDate);

        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    const handlePeriode = (periode) => {
        try {
            router.get("/dashboard", { periode: periode });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Entete de la page */}
            <section className="flex justify-between place-items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Dashbaord</h1>
                    <p className="text-sm text-muted-foreground">
                        Bienvenue, voici une vue d'ensemble de votre situation
                        financière.
                    </p>
                </div>

                <div className="flex gap-3 p-1 border border-gray-300 bg-white rounded-md">
                    <button
                        onClick={() => {
                            setPeriode("mois");
                            handlePeriode("mois");
                        }}
                        className={`${periode == "mois" && "bg-blue-600 text-white"} px-2 rounded-md text-md text-muted-foreground"`}
                    >
                        Mois
                    </button>
                    <button
                        onClick={() => {
                            setPeriode("annee");
                            handlePeriode("annee");
                        }}
                        className={`${periode == "annee" && "bg-blue-600 text-white"} px-2 rounded-md text-md text-muted-foreground"`}
                    >
                        Annee
                    </button>
                </div>
            </section>

            {/* Les statistiques */}
            <CardStatistiques stats={dashbaordStats} className="mb-6" />

            {/* Le graphique */}
            <section className="flex gap-4 mb-6 w-full">
                <Card className="pt-0 w-3/4">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1">
                            <CardTitle>Revenu - Dépense</CardTitle>
                        </div>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger
                                className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 3 months" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="90d" className="rounded-lg">
                                    Last 3 months
                                </SelectItem>
                                <SelectItem value="30d" className="rounded-lg">
                                    Last 30 days
                                </SelectItem>
                                <SelectItem value="7d" className="rounded-lg">
                                    Last 7 days
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <AreaChart data={filteredData}>
                                <defs>
                                    <linearGradient
                                        id="fillRevenu"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#5661fe"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#5661fe"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="fillDepense"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#6F00FF"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#6F00FF"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return date.toLocaleDateString(
                                            "fr-FR",
                                            {
                                                month: "short",
                                                day: "numeric",
                                            },
                                        );
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                return new Date(
                                                    value,
                                                ).toLocaleDateString("fr-FR", {
                                                    month: "short",
                                                    day: "numeric",
                                                });
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />
                                <Area
                                    dataKey="revenu"
                                    type="natural"
                                    fill="url(#fillRevenu)"
                                    stroke="#5661fe"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="depense"
                                    type="natural"
                                    fill="url(#fillDepense)"
                                    stroke="#6F00FF"
                                    stackId="a"
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="flex flex-col w-1/4">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Dépense par catégorie</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig2}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData.transactionParCategorie}
                                    dataKey="montant"
                                    nameKey="categorie"
                                    innerRadius={60}
                                >
                                    <Label
                                        position="center"
                                        value={formatMontant(totalDepense)}
                                        className="text-md font-bold fill-foreground"
                                    />
                                </Pie>

                                <Legend />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
                </Card>
            </section>

            {/* Recentes transactions et objectifs d'epargnes */}
            <section className="flex gap-4 w-full">
                <Card className="pt-0 w-3/4">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1">
                            <CardTitle>Récentes transactions</CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold text-muted-foreground">
                                        DATE
                                    </TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">
                                        DESCRIPTION
                                    </TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">
                                        CATEGORIE
                                    </TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">
                                        MONTANT
                                    </TableHead>
                                </TableRow>
                                {recenteTransactions.map((data) => (
                                    <TableRow key={data.id}>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                data.date,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-gray-800 font-bold">
                                            {data.description}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            <span
                                                style={{
                                                    backgroundColor:
                                                        data.category?.couleur,
                                                    color: "white",
                                                    fontWeight: "bold",
                                                }}
                                                className="px-4 py-1 text-center rounded-full w-fit"
                                            >
                                                {data.category?.nom}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            <span
                                                className={`${data.type === "revenu" ? "text-green-500" : "text-red-500"} font-bold`}
                                            >
                                                {data.type === "revenu"
                                                    ? "+ "
                                                    : "- "}
                                                {formatMontant(data.montant)}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableHeader>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="flex flex-col w-1/4">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <CardTitle>Objectifs d'epargne</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="flex flex-col gap-4 mt-4">
                            <Field className="w-full max-w-sm">
                                <FieldLabel htmlFor="progress-upload">
                                    <div className={"flex flex-col "}>
                                        <h3 className="text-gray-800 font-bold text-sm">
                                            Nouvelle voiture
                                        </h3>
                                        <p className="text-muted-foreground text-xs">
                                            5000000 fcfa / 7000000 fcfa
                                        </p>
                                    </div>
                                    <span className="ml-auto t-primary">
                                        66%
                                    </span>
                                </FieldLabel>

                                <Progress
                                    value={66}
                                    classNameIndicator="bg-blue-600"
                                    id="progress-upload"
                                />
                            </Field>

                            <Field className="w-full max-w-sm">
                                <FieldLabel htmlFor="progress-upload">
                                    <div className={"flex flex-col "}>
                                        <h3 className="text-gray-800 font-bold text-sm">
                                            Fond d'urgence
                                        </h3>
                                        <p className="text-muted-foreground text-xs">
                                            100000 fcfa / 300000 fcfa
                                        </p>
                                    </div>
                                    <span className="ml-auto text-green-600">
                                        65%
                                    </span>
                                </FieldLabel>

                                <Progress
                                    value={65}
                                    classNameIndicator="bg-green-600"
                                    id="progress-upload"
                                />
                            </Field>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </AuthenticatedLayout>
    );
}
