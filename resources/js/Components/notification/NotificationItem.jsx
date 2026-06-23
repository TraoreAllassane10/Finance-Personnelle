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
    const avatarLetter = category_name.split("");
    return (
        <Link href={url}>
            <div className={cn("mt-4 text-xs", className)}>
                <div className="flex items-center gap-2">
                    <div className="size-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {avatarLetter[0]}
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex flex-col flex-wrap">
                            <h1 className="text-slate-800 font-semibold">
                                Budget {category_name}
                            </h1>
                            <p className="text-muted-foreground">{message}</p>
                        </div>

                        <span className="text-xs text-muted-foreground">
                            {date ? new Date(date).toLocaleString() : "à l'instant"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NotificationItem;
