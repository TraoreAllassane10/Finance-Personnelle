import { Link, router, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    PiggyBank,
    Settings,
    LogOut,
    Landmark,
    Banknote,
    ChartColumnDecreasingIcon,
    Wallet2,
    Box,
    UserCircle,
} from "lucide-react";
import React from "react";

const mainMenu = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        route: "dashboard",
    },
    {
        name: "Revenus",
        icon: Banknote,
        route: "revenus",
    },
    {
        name: "Dépenses",
        icon: Wallet2,
        route: "depenses",
    },
    {
        name: "Épargnes",
        icon: PiggyBank,
        route: "epargnes",
    },
    {
        name: "Budgets",
        icon: Wallet2,
        route: "budgets",
    },
    {
        name: "Transactions Recurrentes",
        icon: Wallet2,
        route: "transaction-recurrentes",
    },
    {
        name: "categories",
        icon: Box,
        route: "categories",
    },
    {
        name: "Rapports",
        icon: ChartColumnDecreasingIcon,
        route: "dashboard",
    },
    {
        name: "Paramètres",
        icon: Settings,
        route: "parametres",
    },
];

export const Sidebar = () => {
    const { user } = usePage().props.auth;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <>
            {/* Menu Mobile */}
            <div className="block lg:hidden fixed z-50 bottom-0 left-0 w-full bg-white shadow-sm border-t border-gray-200">
                <div className="">
                    <div className="flex flex-row gap-7 px-10 text-white  my-4">
                        <div className="flex  py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <Link
                                href={route("dashboard")}
                                className="text-xl text-gray-800"
                            >
                                <LayoutDashboard
                                    className="text-gray-500"
                                    size={24}
                                />
                            </Link>
                        </div>

                        <div className="flex py-2 hover:bg-opacity-5 transition">
                            <Link
                                href={route("revenus")}
                                className="text-xl text-gray-800"
                            >
                                <Banknote className="text-gray-500" size={24} />
                            </Link>
                        </div>

                        <div className="flex py-2  transition">
                            <Link
                                href={route("depenses")}
                                className="text-xl text-gray-800"
                            >
                                <Wallet2 className="text-gray-500" size={24} />
                            </Link>
                        </div>

                        <div className="flex  py-2  transition">
                            <Link href={route("epargnes")}>
                                <PiggyBank
                                    className="text-gray-500"
                                    size={24}
                                />
                            </Link>
                        </div>

                        <div className="flex  py-2  transition">
                            <Link href={route("budgets")}>
                                <Wallet2 className="text-gray-500" size={24} />
                            </Link>
                        </div>

                        <div className="flex py-2 transition">
                            <Link
                                href={route("parametres")}
                                className=" hover:text-indigo-800"
                            >
                                <Settings className="text-white" size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden lg:block fixed w-1/6 h-full bg-white shadow-sm border-r">
                <div>
                    {/* Logo et nom */}
                    <div className="flex items-center gap-2 p-6">
                        <Landmark
                            size={24}
                            className="text-white bg-blue-700 p-1 rounded-md"
                        />
                        <span className="text-xl font-semibold">
                            FinanceApp
                        </span>
                    </div>

                    {/* Menu */}
                    <div className="flex flex-col gap-4 mx-4 my-2">
                        {mainMenu.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="flex gap-2 px-2 py-2 hover:bg-blue-50 hover:text-blue-600 hover:border-r-4 hover:border-blue-600 hover:rounded-md group transition duration-300"
                                >
                                    <Icon className="text-gray-700 group-hover:text-blue-600" />
                                    <Link
                                        // href={route(`/${item.route}`)}
                                        href={`/${item.route}`}
                                        className="text-md text-gray-800 group-hover:text-blue-600 group-hover:font-semibold truncate"
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-2 mx-4 absolute bottom-4 left-0 border-t pt-2 w-[90%]">
                    <div className="flex gap-2 px-2 py-2">
                        <UserCircle className="text-gray-700 " />
                        <Link className="text-md text-gray-800 group-hover:font-semibold">
                            {user.name}
                        </Link>
                    </div>

                    <div
                        onClick={handleLogout}
                        className="flex gap-2 px-2 py-2 hover:bg-blue-50 hover:text-blue-600 hover:border-r-4 hover:border-blue-600 hover:rounded-md group transition duration-300"
                    >
                        <LogOut className="text-gray-700 group-hover:text-blue-600" />
                        <Link className="text-md text-gray-800 group-hover:text-blue-600 group-hover:font-semibold">
                            Déconnexion
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
