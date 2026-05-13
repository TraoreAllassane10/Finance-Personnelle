import { Banknote, Car, Salad, Wallet } from "lucide-react";

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
