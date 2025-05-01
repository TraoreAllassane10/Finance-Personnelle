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

            <div className=" flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Bienvenue sur <span className="text-indigo-600">TraoreBank</span>
                    </h2>
                    <p className="text-lg text-gray-500">Salut, {user.name}. Ravi de vous revoir !</p>
                </div>
                <div className="flex gap-4 items-center">
                    <Moon className="text-gray-600 cursor-pointer hover:text-gray-900" />
                    <Bell className="text-gray-600 cursor-pointer hover:text-gray-900" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {[{
                    title: "Revenus",
                    amount: FormatFCFA(totalRevenus),
                    color: "bg-green-100 text-green-700",
                    iconColor: "bg-green-500 text-white",
                }, {
                    title: "Dépenses",
                    amount: FormatFCFA(totalDepenses),
                    color: "bg-red-100 text-red-700",
                    iconColor: "bg-red-500 text-white",
                }, {
                    title: "Total",
                    amount: FormatFCFA(total),
                    color: "bg-blue-100 text-blue-700",
                    iconColor: "bg-blue-500 text-white",
                }].map((card, index) => (
                    <Card key={index} className={`p-6 shadow-lg rounded-xl ${card.color}`}>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-2xl font-semibold">{card.title}</h3>
                                <p className="text-lg font-medium">
                                    {card.amount}
                                    </p>
                            </div>
                            <div className={`p-4 rounded-lg ${card.iconColor}`}>
                                <Banknote size={50} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className='p-6 shadow-lg rounded-xl'>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Évolution des Revenus</h3>
                    <RevenusChart />
                </Card>
                <Card className='p-6 shadow-lg rounded-xl'>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Évolution des Dépenses</h3>
                    <DepensesChart />
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
