import React from "react";
import { Bell, Calendar, Plus, Search } from "lucide-react";
import { Button } from "@headlessui/react";

const Header = () => {
    return (
        <div className="bg-white px-8 py-2 shadow-sm border-r sticky top-0 z-10">
            <div className="flex justify-between place-items-center">
                <div className="flex px-2 place-items-center rounded-md border focus:outline-none hover:ring-2 hover:ring-blue-500 text-muted-foreground">
                    <Search size={20} />
                    <input
                        type="search"
                        placeholder="Rechercher..."
                        className="border-none focus:ring-0 focus:outline-none "
                    />
                </div>

                <div className="flex gap-2">
                    <div className="flex gap-4 place-items-center border-r-2 pr-4">
                        <Calendar className="text-gray-500" size={20} />
                        <Bell className="text-gray-500" size={20} />
                    </div>

                    <Button className="btn-primary flex gap-2 place-items-center">
                        <Plus className="text-white" size={16} />
                        Ajouter une transaction
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;
