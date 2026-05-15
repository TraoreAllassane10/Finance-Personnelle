import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

const Index = () => {
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
                <Card>
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
                                        placeholder="Ex: traoreallassane2255@gmail.com"
                                        className="h-10 py-1 text-sm border-1 border-gray-200 rounded-md focus:ring-1 focus:ring-blue-600 transition"
                                    />
                                </div>
                            </div>

                            <Button className="bg-blue-600 self-end text-white text-xs rounded-md px-2 py-2 hover:bg-blue-800 transition duration-300">
                                Enregistrer
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Card de preferences */}
                <Card>
                    <CardHeader className="border-b border-gray-200">
                        <h2 className="text-slate-700 text-md font-semibold">
                            Preférences
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Gérer vos preférences
                        </p>
                    </CardHeader>

                    <CardContent className="my-4 ">
                        <h3 className="text-slate-700 text-sm font-semibold mb-4">
                            Notifications
                        </h3>

                        <div className="flex flex-col gap-4">
                            <Field
                                orientation="horizontal"
                                className="max-w-sm"
                            >
                                <Switch id="switch-focus-mode" />
                                <FieldContent>
                                    <FieldLabel htmlFor="switch-focus-mode">
                                        Notifications par email
                                    </FieldLabel>
                                    <FieldDescription>
                                        Recevoir quoitidiennement des
                                        notifications importante par email
                                    </FieldDescription>
                                </FieldContent>
                            </Field>

                            <Field
                                orientation="horizontal"
                                className="max-w-sm"
                            >
                                <Switch id="switch-focus-mode" />
                                <FieldContent>
                                    <FieldLabel htmlFor="switch-focus-mode">
                                        Notifications In-App
                                    </FieldLabel>
                                    <FieldDescription>
                                        Recevoir des notifications dans
                                        l'application
                                    </FieldDescription>
                                </FieldContent>
                            </Field>
                        </div>
                    </CardContent>
                </Card>

                {/* Securite */}
                <Card>
                    <CardHeader className="border-b border-gray-200">
                        <h2 className="text-slate-700 text-md font-semibold">
                            Sécurité
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Mettre à jour votre mot de passe et securiser votre
                            compte
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

                {/* Suppression de compte */}
                <Card className="bg-red-100 border border-red-300">
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
                                    Suppression definitive du compte ainsi que
                                    toutes les données financières qui lui sont
                                    associées. Cette action est irréversible.
                                </p>
                            </div>

                            <Button
                                variant={"destructive"}
                                className="self-start text-xs rounded-md px-2 py-2 transition duration-300"
                            >
                                Supprimer votre compte
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;
