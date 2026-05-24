import { Plus, } from "lucide-react";

const CategorieDepense = ({ categories, ConfigIcon, setOpenModal }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {categories
                    .filter((c) => c.type === "depense")
                    .map(({ id, nom, icon, couleur, transactions_count }) => {
                        const Icon = ConfigIcon[icon];

                        return (
                            <div
                                key={id}
                                className="bg-white border border-gray-200 rounded-lg p-8 "
                            >
                                {/* Icon */}
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-4`}
                                    style={{ backgroundColor: couleur }}
                                >
                                    <Icon size={16} />
                                </div>

                                {/* Nom */}
                                <div className="flex gap-2 place-items-center mb-1">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: couleur }}
                                    />
                                    <p className="text-md font-semibold text-gray-900">
                                        {nom}
                                    </p>
                                </div>

                                {/* NOmbre de transaction */}
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {transactions_count} transactions
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                <div
                    onClick={() => setOpenModal(true)}
                    className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col gap-2 items-center justify-center cursor-pointer"
                >
                    <div className="bg-white w-8 h-8 rounded-full flex justify-center items-center border border-gray-300">
                        <Plus size={20} />
                    </div>
                    <p className="text-muted-foreground">Nouvelle categorie</p>
                </div>
            </div>
        </div>
    );
};

export default CategorieDepense;
