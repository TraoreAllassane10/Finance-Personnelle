import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useProfile() {
    const [isLoading, setLoading] = useState(false);

    const udpateNameAndEmail = async (data) => {
        try {
            setLoading(true);

            await axios
                .put("/user/profil", data)
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        toast.success(response.data.message, {
                            position: "top-center",
                        });

                        router.visit("/parametres");
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la mise à jour du profil",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur lors de la mise à jour du profil",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans udpateNameAndEmail", error);
        } finally {
            setLoading(false);
        }
    };

    const updatePassword = async (data) => {
        try {
            setLoading(true);

            await axios
                .put("/user/password", data)
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        toast.success(response.data.message, {
                            position: "top-center",
                        });

                        router.visit("/");
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la mise à jour du mot de passe",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur lors de la mise à jour du mot de passe",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans updatePassword", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async () => {
        try {
            setLoading(true);

            await axios
                .delete("/user/delete")
                .then((response) => {
                    if (response.data.success) {
                        setLoading(false);

                        router.visit("/");
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la suppression du compte utilisateur",
                        { position: "top-center" },
                    );
                    console.log(
                        "Erreur survenue lors de la suppression du compte utilisateur",
                        error,
                    );
                });
        } catch (error) {
            toast.error("Erreur survenue au niveau du serveur", {
                position: "top-center",
            });
            console.log("Erreur dans deleteAccount", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        udpateNameAndEmail,
        deleteAccount,
        updatePassword,
        isLoading,
    };
}
