import React from "react";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Card } from "@/Components/ui/card";

import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";

export const TableTransactionNotFound = () => {


    return (
        <Card className="mb-8 border border-gray-100 rounded-xl transition-all duration-300">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-muted-foreground">
                            DATE
                        </TableHead>
                        <TableHead className="font-semibold text-muted-foreground">
                            DESCRIPTION
                        </TableHead>
                        <TableHead className="font-semibold text-muted-foreground">
                            CATEGORIE
                        </TableHead>
                        <TableHead className="font-semibold text-muted-foreground">
                            MONTANT
                        </TableHead>
                        <TableHead className="font-semibold text-muted-foreground">
                            ACTIONS
                        </TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </Card>
    );
};
