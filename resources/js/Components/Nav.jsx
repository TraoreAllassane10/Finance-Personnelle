import { Link, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    TrendingUp,
    Wallet,
    PiggyBank,
    Settings,
    ClipboardCheck,
    LogOut,
} from "lucide-react";
import React from "react";

export const Nav = () => {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <>
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
                <div className="flex items-center gap-2 p-6">
                    <PiggyBank size={24} className="text-indigo-700" />
                    <span className="text-2xl font-bold">TraoreBank</span>
                </div>

                <div className="py-1">
                    <span className="text-gray-400 px-6">Tableau de bord</span>

                    <div className="flex flex-col gap-4 my-4">
                        <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <LayoutDashboard className="text-gray-700" />
                            <Link
                                href={route("dashboard")}
                                className="text-xl text-gray-800 hover:text-indigo-800"
                            >
                                Dashboard
                            </Link>
                        </div>

                        <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <TrendingUp className="text-gray-700" />
                            <Link
                                href={route("revenus")}
                                className="text-xl text-gray-800 hover:text-indigo-800"
                            >
                                Revenus
                            </Link>
                        </div>

                        <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <Wallet className="text-gray-700" />
                            <Link
                                href={route("depenses")}
                                className="text-xl text-gray-800 hover:text-indigo-800"
                            >
                                Dépenses
                            </Link>
                        </div>

                        <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <ClipboardCheck className="text-gray-700" />
                            <Link
                                href={route("epargnes")}
                                className="text-xl text-gray-800 hover:text-indigo-800"
                            >
                                Épargnes
                            </Link>
                        </div>
                    </div>

                    <span className="text-gray-400 px-6">Options</span>

                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                            <Settings className="text-gray-700" />
                            <Link
                                href={route("parametres")}
                                className="text-xl text-gray-800 hover:text-indigo-800"
                            >
                                Paramètres
                            </Link>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white rounded-md p-1 mx-6 transition"
                        >
                            Deconnexion
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
