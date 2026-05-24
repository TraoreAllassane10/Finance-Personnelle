import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field";
import { Switch } from "../ui/switch";

const CardPreference = () => {
    return (
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
                    <Field orientation="horizontal" className="max-w-sm">
                        <Switch id="switch-focus-mode" />
                        <FieldContent>
                            <FieldLabel htmlFor="switch-focus-mode">
                                Notifications par email
                            </FieldLabel>
                            <FieldDescription>
                                Recevoir quoitidiennement des notifications
                                importante par email
                            </FieldDescription>
                        </FieldContent>
                    </Field>

                    <Field orientation="horizontal" className="max-w-sm">
                        <Switch id="switch-focus-mode" />
                        <FieldContent>
                            <FieldLabel htmlFor="switch-focus-mode">
                                Notifications In-App
                            </FieldLabel>
                            <FieldDescription>
                                Recevoir des notifications dans l'application
                            </FieldDescription>
                        </FieldContent>
                    </Field>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardPreference;
