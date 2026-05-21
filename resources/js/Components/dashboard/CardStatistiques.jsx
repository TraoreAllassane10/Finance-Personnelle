import React from "react";
import { Card } from "../ui/card";
import { formatMontant } from "@/Pages/lib/utils";

const CardStatistiques = ({ stats, className }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${className}`}>
            {stats.map((stat) => (
                <Card className="p-4" key={stat.nom}>
                    <div className="flex justify-between">
                        <h3 className="text-sm text-muted-foreground">
                            {stat.nom}
                        </h3>

                        <div className={`p-2 rounded-md ${stat.bgColor} `}>
                            <stat.icon size={24} className={`${stat.color} `} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-bold">
                            {formatMontant(stat.montant)}
                        </p>

                        <div>
                            {stat.text ? <span className="text-xs text-muted-foreground">{stat.text}</span> : <span className={`text-xs ${stat.trendColor} flex gap-1 place-items-center`}><stat.trendIcon size={16}/> {stat.trendText}</span>}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default CardStatistiques;
