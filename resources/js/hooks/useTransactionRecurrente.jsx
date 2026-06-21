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

    const toggleActive = async (id) => {
        try {
            try {
                setLoading(true);

                await axios
                    .get(`/transaction-recurrentes/${id}/toogle-active`)
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
                            "Erreur survenue lors de la mise à jour d'une transaction",
                            { position: "top-center" },
                        );
                        console.log(
                            "Erreur survenue lors de la mise à jour d'une transaction",
                            error,
                        );
                    });
            } catch (error) {
                toast.error("Erreur survenue au niveau du serveur", {
                    position: "top-center",
                });
                console.log("Erreur dans toggleActive", error);
            } finally {
                setLoading(false);
            }
        } catch (error) {}
    };

    return {
        updateTransaction,
        createTransaction,
        deleteTransaction,
        toggleActive,
        isLoading,
    };
}
