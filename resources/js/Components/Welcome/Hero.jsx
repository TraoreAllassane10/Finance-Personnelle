import { Link } from "@inertiajs/react"
import { Nav } from "./Nav"
import DashbardImg from "@/assets/Dashboard.png"

export const Hero = ({ auth }) => {
    return (
        <div className="w-full h-[770px] bg-[#0F1020] mb-10">
            <Nav auth={auth} />

            <div className="flex flex-col items-center justify-center gap-4 text-white py-10">
                <h1 className="text-4xl font-bold">Gérer votre argent avec facilité</h1>
                <p className="text-sm text-center">Application de gestion de finance personnelle comprenant la gestion des revenus , la gestion des dépenses et la gestion d'epargne </p>

                <Link href={route('login')} className="btn-primary">Commencer maintenant</Link>
            </div>

            <img src={DashbardImg} alt="image de la dashboard" className="w-3/4 mx-auto" />
        </div>
    )
}
