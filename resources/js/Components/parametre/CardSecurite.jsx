import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CardSecurite = () => {
    return (
        <Card>
            <CardHeader className="border-b border-gray-200">
                <h2 className="text-slate-700 text-md font-semibold">
                    Sécurité
                </h2>
                <p className="text-xs text-muted-foreground">
                    Mettre à jour votre mot de passe et securiser votre compte
                </p>
            </CardHeader>

            <CardContent className="my-4 ">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        {/* mot de passe courant */}
                        <div className="w-full flex flex-col gap-2">
                            <Label className="text-xs font-bold text-muted-foreground">
                                Mot de passe courant
                            </Label>
                            <Input
                                type="password"
                                className="h-10 py-1 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                            />
                        </div>

                        {/* nouveau mot de passe */}
                        <div className="w-full flex flex-col gap-2">
                            <Label className="text-xs font-bold text-muted-foreground">
                                Nouveau mot de passe
                            </Label>
                            <Input
                                type="password"
                                className="h-10 py-1 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                            />
                        </div>

                        {/* confirmer mot de passe */}
                        <div className="w-full flex flex-col gap-2">
                            <Label className="text-xs font-bold text-muted-foreground">
                                Confimer le mot de passe
                            </Label>
                            <Input
                                type="password"
                                className="h-10 py-1 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                            />
                        </div>
                    </div>

                    <Button
                        variant={"outline"}
                        className="self-start text-xs rounded-md px-2 py-2 transition duration-300"
                    >
                        Modifier votre mot de passe
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardSecurite;
