import { Link, router, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    PiggyBank,
    Settings,
    LogOut,
    Landmark,
    Banknote,
    Wallet2,
    Box,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const mainMenu = [
    { name: "Dashboard", icon: LayoutDashboard, route: "dashboard" },
    { name: "Revenus", icon: Banknote, route: "revenus" },
    { name: "Dépenses", icon: Wallet2, route: "depenses" },
    { name: "Épargnes", icon: PiggyBank, route: "epargnes" },
    { name: "Budgets", icon: Wallet2, route: "budgets" },
    {
        name: "Transactions récurrentes",
        icon: Wallet2,
        route: "transaction-recurrentes",
    },
    { name: "Catégories", icon: Box, route: "categories" },
    { name: "Paramètres", icon: Settings, route: "parametres" },
];

const mobileMenu = [
    { icon: LayoutDashboard, route: "dashboard", label: "Dashboard" },
    { icon: Banknote, route: "revenus", label: "Revenus" },
    { icon: Wallet2, route: "depenses", label: "Dépenses" },
    { icon: PiggyBank, route: "epargnes", label: "Épargnes" },
    { icon: Wallet2, route: "budgets", label: "Budgets" },
    { icon: Settings, route: "parametres", label: "Paramètres" },
];

export const Sidebar = () => {
    const { user } = usePage().props.auth;
    const currentUrl = usePage().url;

    const isActive = (route) =>
        currentUrl === `/${route}` || currentUrl.startsWith(`/${route}/`);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <>
            {/* Menu Mobile */}
            <div className="block lg:hidden fixed z-50 bottom-0 left-0 w-full bg-background border-t border-border/60 shadow-sm">
                <div className="flex justify-around items-center px-2 py-2">
                    {mobileMenu.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.route);
                        return (
                            <Link
                                key={item.route}
                                href={`/${item.route}`}
                                className={cn(
                                    "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors",
                                    active
                                        ? "text-blue-600"
                                        : "text-muted-foreground hover:text-foreground",
                                )}
                            >
                                <Icon size={20} />
                                <span className="text-[10px] font-medium">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden lg:flex flex-col fixed w-56 h-full bg-background border-r border-border/60">
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border/60">
                    <div className="size-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Landmark size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-foreground tracking-tight">
                        FinanceApp
                    </span>
                </div>

                {/* Nav items */}
                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    {mainMenu.map((item, index) => {
                        const Icon = item.icon;
                        const active = isActive(item.route);

                        return (
                            <Link
                                key={index}
                                href={`/${item.route}`}
                                className={cn(
                                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150 group",
                                    active
                                        ? "bg-blue-50 text-blue-600 font-medium"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                            >
                                <Icon
                                    size={16}
                                    className={cn(
                                        "flex-shrink-0 transition-colors",
                                        active
                                            ? "text-blue-600"
                                            : "text-muted-foreground group-hover:text-foreground",
                                    )}
                                />
                                <span className="truncate">{item.name}</span>
                                {active && (
                                    <span className="ml-auto size-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer utilisateur */}
                <div className="px-3 py-3 border-t border-border/60 space-y-0.5">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg">
                        <div className="size-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-muted-foreground uppercase">
                                {user.name?.charAt(0)}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                                {user.name}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors duration-150 group"
                    >
                        <LogOut
                            size={16}
                            className="flex-shrink-0 group-hover:text-red-600 transition-colors"
                        />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </div>
        </>
    );
};
