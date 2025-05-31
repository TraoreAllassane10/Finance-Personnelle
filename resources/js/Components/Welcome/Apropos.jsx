import React from 'react'
import image from "@/assets/euro-447209_1280.jpg"
import { Link } from '@inertiajs/react'

export const Apropos = () => {
    return (
        <div className='w-3/4 mx-auto flex place-items-center gap-8 mb-10'>
            <div className='w-1/2'>
                <img src={image} alt="Image apropos de nous" className='rounded-tl-xl rounded-br-xl' />
            </div>

            <div className='flex flex-col gap-4 w-1/2'>
                <h2 className='text-md font-bold'>Apropos</h2>

                <p className='text-gray-600 text-justify'>Application de gestion de finance personnelle permettant à toutes personnes de gérer son argent afin
                    d'effectuer des dépenses intelligemment
                    et tracker l'ensemble de ses flux financier.</p>

                <Link href={route('login')} className="btn-primary w-48">Commencer maintenant</Link>
            </div>


        </div>
    )
}
