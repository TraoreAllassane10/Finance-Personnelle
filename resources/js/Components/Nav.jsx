import { BarChart, CircleDollarSignIcon, DollarSign, LucideBadgeDollarSign, PiggyBank, SettingsIcon } from "lucide-react";
import React from "react";

export const Nav = () => {
    return (
        <div className="fixed w-1/6 h-full bg-white shadow-sm border-r">
            <div className="flex items-center gap-2 p-6">
                <PiggyBank size={24} className="text-indigo-700"/>
                <span className="text-2xl font-bold">TraoreBank</span>
            </div>

            <div className="py-1">

                <span className="text-gray-400 px-6">Tableau de bord</span>

                <div className="flex flex-col gap-4 my-4">
                    <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                        <BarChart className="text-gray-700"/>
                        <a href="" className="text-xl text-gray-800 hover:text-indigo-800">Dashboard</a>
                    </div>

                    <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                        <DollarSign className="text-gray-700"/>
                        <a href="" className="text-xl text-gray-800 hover:text-indigo-800">Revenus</a>
                    </div>

                    <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                        <LucideBadgeDollarSign className="text-gray-700"/>
                        <a href="" className="text-xl text-gray-800 hover:text-indigo-800">Depenses</a>
                    </div>

                    <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                        <LucideBadgeDollarSign className="text-gray-700"/>
                        <a href="" className="text-xl text-gray-800 hover:text-indigo-800">Budgets</a>
                    </div>

                    <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                        <LucideBadgeDollarSign className="text-gray-700"/>
                        <a href="" className="text-xl text-gray-800 hover:text-indigo-800">Epargnes</a>
                    </div>

                </div>

                <span className="text-gray-400 px-6">Options</span>

                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-2 px-10 py-2 hover:bg-indigo-900 hover:bg-opacity-5 transition">
                        <SettingsIcon className="text-gray-700"/>
                        <a href="" className="text-xl text-gray-800 hover:text-indigo-800">Paramètres</a>
                    </div>

                </div>
            </div>
        </div>
    );
};
