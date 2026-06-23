import React, { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@headlessui/react";
import NotificationCard from "./notification/NotificationCard";
import { router, usePage } from "@inertiajs/react";
import { useNotification } from "@/hooks/useNotification";

const Header = ({ setOpenModal }) => {
    const { user } = usePage().props.auth;

    const [openNotification, setOpenNotification] = useState(false);
    const [newNotification, setNewNotification] = useState(false);
    const { marquerNotificationsCommeLues } = useNotification();

    // Ecouter le canal de diffusion d'événement
    useEffect(() => {
        window.Echo.private(`App.Models.User.${user.id}`).notification(
            (notification) => {
                if (notification.message) {
                    setNewNotification(true);
                }
            },
        );
    }, []);

    // Recupération des notifications non lue pour l'affiche du point rouge
    const { getNotifications } = useNotification();
    useEffect(() => {
        const fetchNotifications = async () => {
            const notifications = await getNotifications();

            if (notifications.length > 0) {
                setNewNotification(true);
            }
        };

        fetchNotifications();
    }, []);

    // Gerer l'etat du modal d'affichage des notifications
    const handleToggleNotifications = async () => {
        if (openNotification === false) {
            setOpenNotification(true);
        } else {
            setOpenNotification(false);

            // Marquer les notifications non lues comme lue
            await marquerNotificationsCommeLues();
        }
    };

    return (
        <>
            <div className="relative">
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
                            {/* Icon de notification */}
                            <div className="relative">
                                <Button
                                    onClick={handleToggleNotifications}
                                    className="size-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50 transition-colors"
                                >
                                    <Bell size={20} />
                                </Button>

                                {newNotification && (
                                    <div className="absolute top-0.5 right-0.5 size-2 bg-red-500 rounded-full" />
                                )}
                            </div>

                            <Button
                                onClick={() => setOpenModal(true)}
                                className="btn-primary flex gap-2 place-items-center shadow-sm"
                            >
                                Ajouter une transaction
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Notification */}
                <NotificationCard
                    openNotification={openNotification}
                    user={user}
                />
            </div>
        </>
    );
};

export default Header;
