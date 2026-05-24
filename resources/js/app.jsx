import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Toaster } from "./Components/ui/sonner";

const appName = import.meta.env.VITE_APP_NAME || "FinanceApp";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(
                el,
                <div>
                    <App {...props} />
                    <Toaster />
                </div>,
            );
            return;
        }

        createRoot(el).render(
            <div>
                <App {...props} />
                <Toaster />
            </div>,
        );
    },
    progress: {
        color: "#4B5563",
    },
});
