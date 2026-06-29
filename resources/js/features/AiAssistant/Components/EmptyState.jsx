import { Sparkles } from "lucide-react";
import React from "react";

const EmptyState = () => {
    return (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-4 flex w-12 h-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Sparkles />
            </div>

            <h3 className="text-lg font-semibold">Bonjour Allassane</h3>

            <p className="mt-5 text-sm leading-7 text-slate-600">Je suis votre conseiller financier.
              Poser moi vos questions concernant votre budgets, vos dépenses ou vos objectifs d'epargne 
            </p>
        </div>
    );
};

export default EmptyState;
