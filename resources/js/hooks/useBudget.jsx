import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function useBudget() {
    const [isLoading, setLoading] = useState(false);

    const createBudget = async (data) => {
        try {
            setLoading(true);

            await axios
                .post("/budgets", data)
                .then((response) => {
                    console.log(response)
                    if (response.data.success) {
                        setLoading(false);

                        router.visit("/budgets");
                    } else {
                        console.log(response.data.message);
                    }
                })
                .catch((error) =>
                    console.log(
                        "Erreur lors de la creation d'un budget",
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
