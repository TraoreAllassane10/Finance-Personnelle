import React from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@headlessui/react";

const Header = ({ setOpenModal }) => {
    return (
        <div className="bg-white px-8 py-2 shadow-sm border-r sticky top-0 z-10">
            <div className="flex items-center justify-between place-items-center">
                <div className="md:flex hidden  px-2 place-items-center rounded-full border border-border/70 focus:outline-none hover:ring-2 hover:ring-blue-500 text-muted-foreground">
                    <Search size={20} />
                    <input
                        type="search"
                        placeholder="Rechercher..."
                        className="border-none focus:ring-0 focus:outline-none rounded-full"
                    />
                </div>

                <div className="flex gap-2 items-center justify-end place-items-center">
                    <Button className="size-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50 transition-colors">
                        <Bell size={20} />
                    </Button>

                    <Button
                        onClick={() => setOpenModal(true)}
                        className="btn-primary flex gap-2 place-items-center shadow-sm"
                    >
                        Ajouter une transaction
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;
