import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useObjectifEpargne() {
    const [isLoading, setLoading] = useState(false);

    const createObjectifEpargne = async (data) => {
        try {
            setLoading(true);

            await axios
                .post("/objectifs-epargnes", data)
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
                        "Erreur survenue lors de la creation d'un objectif d'epargne",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur lors de la creation d'un objectif d'epargne",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans createObjectifEpargne", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        createObjectifEpargne,
        isLoading,
    };
}
