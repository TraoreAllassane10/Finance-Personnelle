import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function useCategorie() {
    const [isLoading, setLoading] = useState(false);

    const createCategorie = async (data) => {
        try {
            setLoading(true);

            const response = await axios.post("/categories/store", data);

            if (response.data.success) {
                setLoading(false);

                router.visit("/categories");
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Erreur dans createCategorie", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        createCategorie,
    };
}
