import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useTransactionRecurrente() {
    const [isLoading, setLoading] = useState(false);

    const createTransaction = async (data) => {
        try {
            setLoading(true);

            await axios
                .post("/transaction-recurrentes", data)
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        toast.success(response.data.message, {
                            position: "top-center",
                        });

                        return response.data.data;
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

    const updateTransaction = async (id, data) => {
        try {
            setLoading(true);

            await axios
                .put(`/transaction-recurrentes/${id}`, data)
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        toast.success(response.data.message, {
                            position: "top-center",
                        });

                        return response.data.data;
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la modification d'une transaction",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur lors de la modification d'une transaction",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans updateTransaction", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            setLoading(true);

            await axios
                .delete("/transaction-recurrentes/" + id)
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        toast.success(response.data.message, {
                            position: "top-center",
                        });
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la suppression d'une transaction",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur lors de la suppression d'une transaction",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans deleteTransaction", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        updateTransaction,
        createTransaction,
        deleteTransaction,
        isLoading,
    };
}
