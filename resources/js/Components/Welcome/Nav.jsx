import { Link } from "@inertiajs/react"

export const Nav = ({ auth }) => {
    return (
        <div className="flex justify-around place-items-center w-3/4 mx-auto py-3">
            <div>
                <span className="t-primary">
                    <Link href="/">SuperFinance</Link>
                </span>
            </div>

            <nav className="-mx-3 flex flex-1 justify-end">
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Tableau de bord
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="btn-primary"
                        >
                            Commencer maintenant
                        </Link>
                    </>
                )}
            </nav>
        </div>
    )
}
