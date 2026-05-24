import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useCategorie() {
    const [isLoading, setLoading] = useState(false);

    const getCategories = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/categories/all");

            if (response.data.success) {
                setLoading(false);
                return response.data.data;
            }
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });

            console.log("Erreur dans getCategories", error);
        } finally {
            setLoading(false);
        }
    };

    const createCategorie = async (data) => {
        try {
            setLoading(true);

            const response = await axios.post("/categories/store", data);

            if (response.data.success) {
                setLoading(false);

                toast.success(response.data.message, {
                    position: "top-center",
                });

                router.visit("/categories");
            } else {
                toast.error(response.data.message, { position: "top-center" });
            }
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans createCategorie", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        createCategorie,
        getCategories,
        isLoading,
    };
}
