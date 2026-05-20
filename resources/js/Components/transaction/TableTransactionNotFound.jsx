import React from "react";
import { Table, TableBody } from "@/Components/ui/table";

import { Card } from "@/Components/ui/card";
import { Banknote, Wallet } from "lucide-react";

export const TableTransactionNotFound = ({ typeTransaction }) => {
    return (
        <Card className="mb-8 border border-gray-100 rounded-xl transition-all duration-300">
            <Table>
                <TableBody>
                    <div>
                        {typeTransaction === "revenu" ? (
                            <div className="flex flex-col items-center justify-center gap-4 p-10">
                                <Banknote size={70} className="text-gray-400" />
                                <h1 className="text-gray-500 text-lg">
                                    Aucun revenu trouvé
                                </h1>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4">
                                <Wallet size={70} className="text-gray-400" />
                                <h1 className="text-gray-500 text-lg">
                                    Aucune depense trouvée
                                </h1>
                            </div>
                        )}
                    </div>
                </TableBody>
            </Table>
        </Card>
    );
};
