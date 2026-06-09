import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useVersement() {
    const [isLoading, setLoading] = useState(false);

    const createVersement = async (data) => {
        try {
            setLoading(true);

            await axios
                .post("/versements", data)
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        toast.success(response.data.message, {
                            position: "top-center",
                        });

                        router.visit("/epargnes");
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation d'un versement",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur lors de la creation d'un versement",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans createVersement", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        createVersement,
        isLoading,
    };
}
