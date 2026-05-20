import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function useTransaction() {
    const [isLoading, setLoading] = useState(false);

    const createTransaction = async (data) => {
        try {
            setLoading(true);

            await axios
                .post("/transactions", data)
                .then((response) => {
                    console.log(response)
                    if (response.data.success) {
                        setLoading(false);

                        router.reload();
                    } else {
                        console.log(response.data.message);
                    }
                })
                .catch((error) =>
                    console.log(
                        "Erreur lors de la creation d'une transaction",
                        error,
                    ),
                );
        } catch (error) {
            console.log("Erreur dans createBudget", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        createBudget,
        isLoading,
    };
}
