import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { useNotification } from "@/hooks/useNotification";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";

const NotificationCard = ({ openNotification, user }) => {
    const [notifications, setNotifications] = useState([]);

    const { getNotifications } =
        useNotification();

    // Recupération des notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            const data = await getNotifications();

            setNotifications(data);
        };

        fetchNotifications();
    }, []);

    // Recuperation d'une nouvelle notification en temps reels
    useEffect(() => {
        window.Echo.private(`App.Models.User.${user.id}`).notification(
            (notification) => {
                console.log(notification);
                setNotifications((prev) => [notification, ...prev]);
            },
        );
    }, []);


    return (
        <div className="absolute z-50 right-4">
            {openNotification && (
                <Card className="shadow-lg border border-border/30 w-[300px]">
                    <CardHeader className="text-muted-foreground font-medium text-sm">
                        Notifications
                    </CardHeader>
                    <Separator />

                    {
                    notifications.length > 0 ? ( notifications.map((notification) => (
                        <>
                            <CardContent>
                                {/* Ce composant est conçu seulement pour les notifications de bugdet depassé 
                                Si j'ajoute d'autres type de notification, il faut que je crée eux leur NotificationItem.
                                Je peux controler l'affichage grace à notification.data.type
                            */}
                                <NotificationItem
                                    key={notification.id}
                                    id={notification.id}
                                    category_name={
                                        notification.data
                                            ? notification.data.category_name
                                            : notification.category_name
                                    }
                                    message={
                                        notification.data
                                            ? notification.data.message
                                            : notification.message
                                    }
                                    date={notification.created_at}
                                    url={
                                        notification.data
                                            ? notification.data.url
                                            : notification.url
                                    }
                                    className="pt-2"
                                />
                            </CardContent>
                            <Separator className="latest:none" />
                        </>
                    ))) : (<span className="flex items-center justify-center p-4 text-xs text-muted-foreground">Aucune notification trouvée</span>)
                   }
                </Card>
            )}
        </div>
    );
};

export default NotificationCard;
