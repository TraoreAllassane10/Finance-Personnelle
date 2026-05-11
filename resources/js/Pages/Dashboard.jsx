import DepensesChart from "@/Components/DepensesChart";
import RevenusChart from "@/Components/RevenusChart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Banknote, Bell, Moon } from "lucide-react";
import { Card } from "@/Components/ui/card";

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const totalRevenus = usePage().props.totalRevenus;
    const totalDepenses = usePage().props.totalDepenses;
    const total = usePage().props.total;

    const FormatFCFA = (montant) => {
        return montant.toLocaleString('fr-CI', {style: "currency", currency: "XOF"})
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

           
        </AuthenticatedLayout>
    );
}
