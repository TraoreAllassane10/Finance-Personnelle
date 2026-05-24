export const formatMontant = (montant) => {
    return Number(montant).toLocaleString("fr-CI", {
        style: "currency",
        currency: "XOF",
    });
};
