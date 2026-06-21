import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import useProfile from "@/hooks/useProfile";

const CardCompte = () => {
    const { deleteAccount, isLoading } = useProfile();

    return (
        <Card className="bg-red-100 border border-red-300 border border-border/60 shadow-none rounded-xl overflow-hidden hover:border-border/80 transition-colors duration-150">
            <CardHeader className="border-b border-red-200">
                <h2 className="text-red-700 text-md font-semibold">
                    Zone dangereuse
                </h2>
            </CardHeader>

            <CardContent className="my-4 ">
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h5 className="text-slate-600 text-sm font-semibold">
                            Supprimer votre compte
                        </h5>
                        <p className="text-xs text-muted-foreground">
                            Suppression definitive du compte ainsi que toutes
                            les données financières qui lui sont associées.
                            Cette action est irréversible.
                        </p>
                    </div>

                    <Button
                        variant={"destructive"}
                        className="self-start text-xs rounded-md px-2 py-2 transition duration-300"
                        disabled={isLoading}
                        onClick={deleteAccount}
                    >
                        {isLoading ? "Suppression..." : "Supprimer votre compte"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardCompte;
