import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useTransaction() {
    const [isLoading, setLoading] = useState(false);

    const createTransaction = async (data) => {
        try {
            setLoading(true);

            await axios
                .post("/transactions", data)
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        toast.success(response.data.message, {
                            position: "top-center",
                        });

                        router.reload();
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation d'une transaction",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur lors de la creation d'une transaction",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans createTransaction", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        createTransaction,
        isLoading,
    };
}
