import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
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
import { dashbaordStats, recentesTransaction } from "@/constant";
import { useState } from "react";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/Components/ui/progress";

// Données pour le graphique Revenu - Depense
export const description = "An interactive area chart";

const chartData = [
    { date: "2024-04-01", revenu: 222, depense: 150 },
    { date: "2024-04-02", revenu: 97, depense: 180 },
    { date: "2024-04-03", revenu: 167, depense: 120 },
    { date: "2024-04-04", revenu: 242, depense: 260 },
    { date: "2024-04-05", revenu: 373, depense: 290 },
    { date: "2024-04-06", revenu: 301, depense: 340 },
    { date: "2024-04-07", revenu: 245, depense: 180 },
    { date: "2024-04-08", revenu: 409, depense: 320 },
    { date: "2024-04-09", revenu: 59, depense: 110 },
    { date: "2024-04-10", revenu: 261, depense: 190 },
    { date: "2024-04-11", revenu: 327, depense: 350 },
    { date: "2024-04-12", revenu: 292, depense: 210 },
    { date: "2024-04-13", revenu: 342, depense: 380 },
    { date: "2024-04-14", revenu: 137, depense: 220 },
    { date: "2024-04-15", revenu: 120, depense: 170 },
    { date: "2024-04-16", revenu: 138, depense: 190 },
    { date: "2024-04-17", revenu: 446, depense: 360 },
    { date: "2024-04-18", revenu: 364, depense: 410 },
    { date: "2024-04-19", revenu: 243, depense: 180 },
    { date: "2024-04-20", revenu: 89, depense: 150 },
    { date: "2024-04-21", revenu: 137, depense: 200 },
    { date: "2024-04-22", revenu: 224, depense: 170 },
    { date: "2024-04-23", revenu: 138, depense: 230 },
    { date: "2024-04-24", revenu: 387, depense: 290 },
    { date: "2024-04-25", revenu: 215, depense: 250 },
    { date: "2024-04-26", revenu: 75, depense: 130 },
    { date: "2024-04-27", revenu: 383, depense: 420 },
    { date: "2024-04-28", revenu: 122, depense: 180 },
    { date: "2024-04-29", revenu: 315, depense: 240 },
    { date: "2024-04-30", revenu: 454, depense: 380 },
    { date: "2024-05-01", revenu: 165, depense: 220 },
    { date: "2024-05-02", revenu: 293, depense: 310 },
    { date: "2024-05-03", revenu: 247, depense: 190 },
    { date: "2024-05-04", revenu: 385, depense: 420 },
    { date: "2024-05-05", revenu: 481, depense: 390 },
    { date: "2024-05-06", revenu: 498, depense: 520 },
    { date: "2024-05-07", revenu: 388, depense: 300 },
    { date: "2024-05-08", revenu: 149, depense: 210 },
    { date: "2024-05-09", revenu: 227, depense: 180 },
    { date: "2024-05-10", revenu: 293, depense: 330 },
    { date: "2024-05-11", revenu: 335, depense: 270 },
    { date: "2024-05-12", revenu: 197, depense: 240 },
    { date: "2024-05-13", revenu: 197, depense: 160 },
    { date: "2024-05-14", revenu: 448, depense: 490 },
    { date: "2024-05-15", revenu: 473, depense: 380 },
    { date: "2024-05-16", revenu: 338, depense: 400 },
    { date: "2024-05-17", revenu: 499, depense: 420 },
    { date: "2024-05-18", revenu: 315, depense: 350 },
    { date: "2024-05-19", revenu: 235, depense: 180 },
    { date: "2024-05-20", revenu: 177, depense: 230 },
    { date: "2024-05-21", revenu: 82, depense: 140 },
    { date: "2024-05-22", revenu: 81, depense: 120 },
    { date: "2024-05-23", revenu: 252, depense: 290 },
    { date: "2024-05-24", revenu: 294, depense: 220 },
    { date: "2024-05-25", revenu: 201, depense: 250 },
    { date: "2024-05-26", revenu: 213, depense: 170 },
    { date: "2024-05-27", revenu: 420, depense: 460 },
    { date: "2024-05-28", revenu: 233, depense: 190 },
    { date: "2024-05-29", revenu: 78, depense: 130 },
    { date: "2024-05-30", revenu: 340, depense: 280 },
    { date: "2024-05-31", revenu: 178, depense: 230 },
    { date: "2024-06-01", revenu: 178, depense: 200 },
    { date: "2024-06-02", revenu: 470, depense: 410 },
    { date: "2024-06-03", revenu: 103, depense: 160 },
    { date: "2024-06-04", revenu: 439, depense: 380 },
    { date: "2024-06-05", revenu: 88, depense: 140 },
    { date: "2024-06-06", revenu: 294, depense: 250 },
    { date: "2024-06-07", revenu: 323, depense: 370 },
    { date: "2024-06-08", revenu: 385, depense: 320 },
    { date: "2024-06-09", revenu: 438, depense: 480 },
    { date: "2024-06-10", revenu: 155, depense: 200 },
    { date: "2024-06-11", revenu: 92, depense: 150 },
    { date: "2024-06-12", revenu: 492, depense: 420 },
    { date: "2024-06-13", revenu: 81, depense: 130 },
    { date: "2024-06-14", revenu: 426, depense: 380 },
    { date: "2024-06-15", revenu: 307, depense: 350 },
    { date: "2024-06-16", revenu: 371, depense: 310 },
    { date: "2024-06-17", revenu: 475, depense: 520 },
    { date: "2024-06-18", revenu: 107, depense: 170 },
    { date: "2024-06-19", revenu: 341, depense: 290 },
    { date: "2024-06-20", revenu: 408, depense: 450 },
    { date: "2024-06-21", revenu: 169, depense: 210 },
    { date: "2024-06-22", revenu: 317, depense: 270 },
    { date: "2024-06-23", revenu: 480, depense: 530 },
    { date: "2024-06-24", revenu: 132, depense: 180 },
    { date: "2024-06-25", revenu: 141, depense: 190 },
    { date: "2024-06-26", revenu: 434, depense: 380 },
    { date: "2024-06-27", revenu: 448, depense: 490 },
    { date: "2024-06-28", revenu: 149, depense: 200 },
    { date: "2024-06-29", revenu: 103, depense: 160 },
    { date: "2024-06-30", revenu: 446, depense: 400 },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Revenu",
        color: "#5661fe",
    },
    mobile: {
        label: "Depense",
        color: "#6F00FF",
    },
};

// Donnees pour le grahpique Depense par categorie
const chartData2 = [
    { browser: "chrome", visitors: 275, fill: "#5661fe" },
    { browser: "safari", visitors: 200, fill: "#8B5CF6" },
    { browser: "firefox", visitors: 187, fill: "#F59E0B" },
    { browser: "edge", visitors: 173, fill: "#EF4444" },
    { browser: "other", visitors: 90, fill: "#6B7280" },
];

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
    const [timeRange, setTimeRange] = useState("90d");

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date("2024-06-30");
        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

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
                    <button className="bg-blue-600 px-2 text-white rounded-md text-md">
                        Mois
                    </button>
                    <button className="text-md text-muted-foreground">
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
                                    data={chartData2}
                                    dataKey="visitors"
                                    nameKey="browser"
                                    innerRadius={60}
                                >
                                    <Label
                                        position="center"
                                        value={200000 + " fcfa"}
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
                                {recentesTransaction.map((data) => (
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
                                            {data.categorie}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            <span
                                                className={`${data.type === "revenu" ? "text-green-500" : "text-black"} font-bold`}
                                            >
                                                {data.type === "revenu"
                                                    ? "+ "
                                                    : "- "}
                                                {data.montant.toLocaleString(
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
