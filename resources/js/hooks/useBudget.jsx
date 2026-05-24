import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useBudget() {
    const [isLoading, setLoading] = useState(false);

    const createBudget = async (data) => {
        try {
            setLoading(true);

            await axios
                .post("/budgets", data)
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        toast.success(response.data.message, {
                            position: "top-center",
                        });

                        router.visit("/budgets");
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation d'un budget",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur lors de la creation d'un budget",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans createBudget", error);
        } finally {
            setLoading(false);
        }
    };

      const deleteBudget = async (id) => {
        try {
            setLoading(true);

            await axios
                .delete("/budgets/"+ id)
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        toast.success(response.data.message, {
                            position: "top-center",
                        });

                        router.visit("/budgets");
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la suppression d'un budget",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur lors de la suppression d'un budget",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans deleteBudget", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        createBudget,
        deleteBudget,
        isLoading,
    };
}
