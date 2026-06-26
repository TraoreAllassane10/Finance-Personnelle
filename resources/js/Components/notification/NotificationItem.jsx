import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

const NotificationItem = ({
    id,
    category_name,
    message,
    date,
    url,
    className,
}) => {
    return (
        <Link href={url}>
            <div className={cn("mt-4 text-xs", className)}>
                <h1 className="text-slate-700 font-medium">
                    Budget {category_name}
                </h1>

                <div className="flex flex-col gap-1">
                    <div className="flex flex-col flex-wrap">
                        <p className="text-muted-foreground">{message}</p>
                    </div>

                    <span className="text-xs italic text-muted-foreground">
                        {date ? new Date(date).toLocaleString() : "à l'instant"}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default NotificationItem;
