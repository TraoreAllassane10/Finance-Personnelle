import React from 'react'
import icon1 from "@/assets/revenus.png";
import icon2 from "@/assets/depenses.png";
import icon3 from "@/assets/compte-depargne.png";

export const Fonctionnalites = () => {
    return (
        <div className='mb-10'>
            <h2 className='text-lg text-center font-bold'>Fonctionnalités</h2>

            <div className='flex gap-4 w-3/4 mx-auto mt-4'>
                <div className='w-80 h-52 flex flex-col justify-center items-center shadow-lg rounded-lg'>
                    <img src={icon1} alt="icon revenu" className='h-1/2'/>
                    <span className='t-primary'>Gestion des revenus</span>
                </div>

                <div className='w-80 h-52 flex flex-col justify-center items-center shadow-lg rounded-lg'>
                    <img src={icon2} alt="icon depense" className='h-1/2'/>
                    <span className='t-primary'>Gestion des dépenses</span>
                </div>

                <div className='w-80 h-52 flex flex-col justify-center items-center shadow-lg rounded-lg'>
                    <img src={icon3} alt="icon epargne" className='h-1/2'/>
                    <span className='t-primary'>Gestion des epargnes</span>
                </div>
            </div>
        </div>
    )
}
