import { useState } from "react";

export function useNotification() {
    const [isLoading, setLoading] = useState(false);

    const getNotifications = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/notifications");

            if (response.data.success) {
                setLoading(false);
                return response.data.data;
            }
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });

            console.log("Erreur dans getNotifications", error);
        } finally {
            setLoading(false);
        }
    };

    const marquerNotificationsCommeLues = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/notification/mark-as-read");

            if (response.data.success) {
                setLoading(false);
            }
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });

            console.log("Erreur dans marquerNotificationsCommeLues", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        getNotifications,
        marquerNotificationsCommeLues,
        isLoading,
    };
}
