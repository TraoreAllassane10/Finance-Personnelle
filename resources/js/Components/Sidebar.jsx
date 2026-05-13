import { Link, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    TrendingUp,
    Wallet,
    PiggyBank,
    Settings,
    ClipboardCheck,
    LogOut,
    Landmark,
    Banknote,
    ChartColumnDecreasingIcon,
    Wallet2,
    User,
    Box,
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
        route: "dashboard",
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
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <>
            {/* Menu Mobile */}
            <div className="block lg:hidden fixed z-50 bottom-0 left-0 w-full bg-blue-500 shadow-sm border-r">
                <div className="">
                    <div className="flex flex-row gap-8 px-10 text-white  flex-wrap my-4">
                        <div className="flex  py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <Link
                                href={route("dashboard")}
                                className="text-xl text-gray-800 hover:text-indigo-800"
                            >
                                <LayoutDashboard
                                    className="text-white"
                                    size={20}
                                />
                            </Link>
                        </div>

                        <div className="flex py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <Link
                                href={route("revenus")}
                                className="text-xl text-gray-800 hover:text-indigo-800"
                            >
                                <TrendingUp className="text-white" size={20} />
                            </Link>
                        </div>

                        <div className="flex py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <Link
                                href={route("depenses")}
                                className="text-xl text-gray-800 hover:text-indigo-800"
                            >
                                <Wallet className="text-white" size={20} />
                            </Link>
                        </div>

                        <div className="flex  py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <Link href={route("epargnes")}>
                                <ClipboardCheck
                                    className="text-white"
                                    size={20}
                                />
                            </Link>
                        </div>

                        <div className="flex py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <Link
                                href={route("parametres")}
                                className=" hover:text-indigo-800"
                            >
                                <Settings className="text-white" size={20} />
                            </Link>
                        </div>

                        <div className="flex  py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <button
                                onClick={handleLogout}
                                className=" text-white rounded-md transition"
                            >
                                <LogOut size={20} className="text-white" />
                            </button>
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
                                        href={route(`${item.route}`)}
                                        className="text-md text-gray-800 group-hover:text-blue-600 group-hover:font-semibold"
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-2 mx-4 absolute bottom-4 left-0 border-t pt-2 w-[90%]">
                    <div className="flex gap-2 px-2 py-2 hover:bg-blue-50 hover:text-blue-600 hover:border-r-4 hover:border-blue-600 hover:rounded-md group transition duration-300">
                        <User className="text-gray-700 group-hover:text-blue-600" />
                        <Link className="text-md text-gray-800 group-hover:text-blue-600 group-hover:font-semibold">
                            Compte
                        </Link>
                    </div>

                    <div className="flex gap-2 px-2 py-2 hover:bg-blue-50 hover:text-blue-600 hover:border-r-4 hover:border-blue-600 hover:rounded-md group transition duration-300">
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
