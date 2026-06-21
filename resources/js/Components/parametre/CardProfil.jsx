import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useProfile from "@/hooks/useProfile";

const CardProfil = ({ userData, setUserData }) => {
    const handleChange = (cle, valeur) => {
        setUserData((prev) => ({ ...prev, [cle]: valeur }));
    };

    const canSubmit = userData.email && userData.name

    const { udpateNameAndEmail, isLoading } = useProfile();

    const handleSubmit = () => {
        udpateNameAndEmail(userData);
    };

    return (
        <Card className='border border-border/60 shadow-none rounded-xl overflow-hidden hover:border-border/80 transition-colors duration-150'>
            <CardHeader className="border-b border-gray-200">
                <h2 className="text-slate-700 text-md font-semibold">
                    Information du profil
                </h2>
                <p className="text-xs text-muted-foreground">
                    Mettre jour les informations de votre profil
                </p>
            </CardHeader>

            <CardContent className="my-4 ">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        {/* Nom */}
                        <div className="w-full flex flex-col gap-2">
                            <Label className="text-xs font-bold text-muted-foreground">
                                Nom complet
                            </Label>
                            <Input
                                value={userData.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                                placeholder="Ex: Traore Allassane"
                                className="h-10 py-1 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                            />
                        </div>

                        {/* Email */}
                        <div className="w-full flex flex-col gap-2">
                            <Label className="text-xs font-bold text-muted-foreground">
                                Email
                            </Label>
                            <Input
                                value={userData.email}
                                onChange={(e) =>
                                    handleChange("email", e.target.value)
                                }
                                placeholder="Ex: traoreallassane2255@gmail.com"
                                className="h-10 py-1 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={!canSubmit || isLoading}
                        className="bg-blue-600 self-end text-white text-xs rounded-md px-2 py-2 hover:bg-blue-800 transition duration-300"
                    >
                        {isLoading ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardProfil;
