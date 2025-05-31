import React from 'react'
import boy1 from "@/assets/boy-8847075_640.jpg";
import boy2 from "@/assets/man-7450033_640.jpg";
import boy3 from "@/assets/man-8847069_1280.jpg";
import { Link } from '@inertiajs/react';

export const Temoignages = () => {
    return (
        <div className='mb-10'>
            <h2 className='text-lg text-center font-bold'>Témoignages</h2>

            <div className='flex gap-4 w-3/4 mx-auto mt-4'>
                <div className='bg-gray-200 w-80 h-52 flex flex-col p-4  rounded-lg'>

                    <div className='flex place-items-center justify-between'>
                        <span className='uppercase font-medium'>Traore Allassane</span>
                        <img src={boy1} alt="icon revenu" className='w-10 h-10 rounded-full' />
                    </div>

                    <span className='text-sm text-gray-700 text-justify py-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestias. Porro sed quam quis amet id ab quas officiis
                        magnam, perferendis consequuntur.</span>

                    <Link href='' className='flex justify-end text-sm link'>Lire plus</Link>
                </div>

                 <div className='bg-gray-200 w-80 h-52 flex flex-col p-4  rounded-lg'>

                    <div className='flex place-items-center justify-between'>
                        <span className='uppercase font-medium'>Konan Franck</span>
                        <img src={boy2} alt="icon revenu" className='w-10 h-10 rounded-full' />
                    </div>

                    <span className='text-sm text-gray-700 text-justify py-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestias. Porro sed quam quis amet id ab quas officiis
                        magnam, perferendis consequuntur.</span>

                    <Link href='' className='flex justify-end text-sm link'>Lire plus</Link>
                </div>

                 <div className='bg-gray-200 w-80 h-52 flex flex-col p-4  rounded-lg'>

                    <div className='flex place-items-center justify-between'>
                        <span className='uppercase font-medium'>Kouadio Franck</span>
                        <img src={boy3} alt="icon revenu" className='w-10 h-10 rounded-full' />
                    </div>

                    <span className='text-sm text-gray-700 text-justify py-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestias. Porro sed quam quis amet id ab quas officiis
                        magnam, perferendis consequuntur.</span>

                    <Link href='' className='flex justify-end text-sm link'>Lire plus</Link>
                </div>
            </div>
        </div>
    )
}
