import DepensesChart from "@/Components/DepensesChart";
import RevenusChart from "@/Components/RevenusChart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Banknote, Bell, Moon } from "lucide-react";
import { Card } from "@/Components/ui/card";

export default function Dashboard() {

    const user = usePage().props.auth.user;
    const totalRevenus = usePage().props.totalRevenus;
    const totalDepenses = usePage().props.totalDepenses
    const total = usePage().props.total

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div>
                <div className="py-8 flex justify-between place-items-center">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl text-gray-800 font-bold">
                            Bienvenue sur TraoreBank
                        </h2>
                        <p className="text-md text-gray-500">
                            Salut,{user.name}.Bienvenue
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Moon />
                        <Bell />
                        {/* <img src="" alt="" /> */}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="flex justify-between place-items-center py-6 bg-white shadow-md rounded-lg">
                    <div className="flex flex-col p-6 gap-4">
                        <h3 className="text-2xl text-indigo-800 font-semibold">Revenus</h3>
                        <p className="text-lg text-gray-700">{totalRevenus} XOF</p>
                    </div>

                    <div className="p-6">
                        <Banknote size={80} className="bg-green-500 text-green-500 bg-opacity-15 rounded-lg" />
                    </div>
                </div>

                <div className="flex justify-between place-items-center py-6 bg-white shadow-md rounded-lg">
                    <div className="flex flex-col p-6 gap-4">
                        <h3 className="text-2xl text-indigo-800 font-semibold">Depenses</h3>
                        <p className="text-lg text-gray-700">{totalDepenses} XOF</p>
                    </div>

                    <div className="p-6">
                        <Banknote size={80} className="bg-red-500 text-red-500 bg-opacity-15 rounded-lg" />
                    </div>
                </div>

                <div className="flex justify-between place-items-center py-6 bg-white shadow-md rounded-lg">
                    <div className="flex flex-col p-6 gap-4">
                        <h3 className="text-2xl text-indigo-800 font-semibold">Total</h3>
                        <p className="text-lg text-gray-700">{total} XOF</p>
                    </div>

                    <div className="p-6">
                        <Banknote size={80} className="bg-gray-800 text-gray-800 bg-opacity-15 rounded-lg" />
                    </div>
                </div>
            </div>

            <Card className='my-8'>
                <RevenusChart />
            </Card>

            <Card>
                <DepensesChart />
            </Card>

        </AuthenticatedLayout>
    );
}
