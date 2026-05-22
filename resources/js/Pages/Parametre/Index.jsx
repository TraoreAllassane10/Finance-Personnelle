import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import CardProfil from "@/Components/parametre/CardProfil";
import CardPreference from "@/Components/parametre/CardPreference";
import CardSecurite from "@/Components/parametre/CardSecurite";
import CardCompte from "@/Components/parametre/CardCompte";

const Index = () => {
    const { user } = usePage().props.auth;

    const [userData, setUserData] = useState({
        name: user?.name ?? "",
        email: user?.email ?? "",
    });

    return (
        <AuthenticatedLayout>
            <Head title="Paramètre" />

            {/* Entete de la page */}
            <section className="mb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">Paramètres</h1>
                    <p className="text-sm text-muted-foreground">
                        Gérer votre compte et vos preférences.
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                {/* Card de profil */}
                <CardProfil userData={userData} setUserData={setUserData} />

                {/* Card de preferences */}
                <CardPreference />

                {/* Securite */}
                <CardSecurite/>

                {/* Suppression de compte */}
                <CardCompte/>
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;
