import {
    ArrowDown,
    ArrowUp,
    Banknote,
    Car,
    Landmark,
    PiggyBank,
    Salad,
    TrendingDown,
    TrendingUp,
    Wallet,
} from "lucide-react";

export const categories = [
    {
        id: 1,
        name: "Alimentation",
        type: "depense",
        icon: Salad,
        color: "#25ced1",
        transaction: 25,
    },
    {
        id: 2,
        name: "Transport",
        type: "depense",
        icon: Car,
        color: "#fff07c",
        transaction: 12,
    },
    {
        id: 3,
        name: "salaire",
        type: "revenu",
        icon: Banknote,
        color: "#3a506b",
        transaction: 56,
    },
    {
        id: 4,
        name: "investissement",
        type: "revenu",
        icon: Wallet,
        color: "#83e8ba",
        transaction: 20,
    },
];

export const dashbaordStats = [
    {
        nom: "Total des revenus",
        montant: 500000,
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
        montant: 200000,
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
        montant: 300000,
        icon: Landmark,
        bgColor: "bg-blue-100",
        color: "text-blue-600",
        text: "Solde disponible apres depenses",
    },
    {
        nom: "Epargnes",
        montant: 1000000,
        icon: PiggyBank,
        bgColor: "bg-purple-100",
        color: "text-purple-600",
        text: "Epargnes totales",
    },
];

export const recentesTransaction = [
    {
        id: 1,
        date: "2026-05-15",
        description: "Paiement de loyer",
        categorie: "Loyer",
        montant: 20_000,
        type: "depense",
    },
    {
        id: 2,
        date: "2026-05-15",
        description: "Paiement de Facture",
        categorie: "Facture",
        montant: 50_000,
        type: "depense",
    },
    {
        id: 3,
        date: "2026-12-31",
        description: "Salaire du mois de décembre",
        categorie: "Salaire",
        montant: 500_000,
        type: "revenu",
    },
    {
        id: 4,
        date: "2026-12-31",
        description: "Bourse",
        categorie: "Inverstissement",
        montant: 1_000_000,
        type: "revenu",
    },
];

export const depotRecent = [
    {
        id: 1,
        date: "2026-12-31",
        compte: "Epargne Principal",
        montant: 200_000,
    },
    {
        id: 2,
        date: "2026-12-31",
        compte: "Fond de vacance",
        montant: 300_000,
    },
    {
        id: 3,
        date: "2026-12-31",
        compte: "Epargne Principal",
        montant: 500_000,
    },
    {
        id: 4,
        date: "2026-12-31",
        compte: "Fond de vacance",
        montant: 600_000,
    },
];
