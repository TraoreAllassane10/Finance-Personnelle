import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { router, useForm, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

const Parametres = () => {

    const { user } = usePage().props.auth;

    //Les données personnnelles
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: ''
    })

    const [devise, setDevise] = useState("")
    const [theme, setTheme] = useState("")
    const [langue, setLangue] = useState("")
    const [limite, setLimite] = useState("")
    const [categorie, setCategorie] = useState("")


    //mise à jour des données de l'utilisateur
    const handleInfoUser = (e) => {
        e.preventDefault()
        put(route('user.infos', user.id),)
    }

    //Ajout d'une categorie
    const handleRegisterCategorie = (e) => {
        e.preventDefault();
        router.post(route('categorie.store'), { categorie });
    }

    return (
        <AuthenticatedLayout>

            <section className='bg-white p-10 rounded-xl'>
                <h2 className="text-2xl text-gray-700 font-semibold mb-5">
                    Parametres
                </h2>

                <div className='grid grid-cols-2 gap-4'>
                    {/* Informations personnelles */}
                    <div className='border border-gray-200 p-6 rounded-lg'>
                        <form onSubmit={handleInfoUser} className='flex flex-col gap-2'>
                            <legend className='text-lg mb-2'>Informations Personelles</legend>
                            <Label>Nom Compte</Label>
                            <Input name='name' value={data.name} onChange={(e) => setData('name', e.target.value)} />

                            <Label>Email</Label>
                            <Input name='email' value={data.email} onChange={(e) => setData('email', e.target.value)} />

                            <Label>Mot de passe</Label>
                            <Input type='password' name='password' value={data.password} onChange={(e) => setData('password', e.target.value)} />

                            <Button className='bg-indigo-500 hover:bg-indigo-700 transition'>Mise à jour</Button>
                        </form>
                    </div>

                    {/* Preferences */}
                    <div className='border border-gray-200 p-6 rounded-lg'>
                        <form action="" className='flex flex-col gap-2'>
                            <legend className='text-lg mb-2'>Preferences</legend>

                            <Label>Devise</Label>
                            <select name="devise" onChange={(e) => setDevise(e.target.value)} id="" className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'>
                                <option value="">FCFA</option>
                                <option value="">EURO</option>
                                <option value="">USD</option>
                            </select>

                            <Label>Theme</Label>
                            <select name="" onChange={(e) => setTheme(e.target.value)} className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'>
                                <option value="">Clair</option>
                                <option value="">Sombre</option>
                            </select>

                            <Label>Langues</Label>
                            <select name="" onChange={(e) => setLangue(e.target.value)} className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'>
                                <option value="">Français</option>
                                <option value="">Anglais</option>
                                <option value="">Espanole</option>
                            </select>

                            <Button className='bg-green-500 hover:bg-green-700 transition'>Enregistrer</Button>
                        </form>
                    </div>

                    {/* Limite de Depenses */}
                    {/* <div className='border border-gray-200 p-6 rounded-lg'>
                        <form action="">
                            <Label>Definir une nouvelle limite</Label>
                            <div className='flex gap-2'>
                                <Input />
                                <Button className='bg-indigo-500 hover:bg-indigo-700 transition'>Sauvegarder</Button>
                            </div>
                        </form>
                    </div> */}

                    {/* Ajout de nouvelle categorie */}
                    <div className='border border-gray-200 p-6 rounded-lg'>

                        <form onSubmit={handleRegisterCategorie}>
                            <Label>Ajouter une nouvelle categorie</Label>
                            <div className='flex gap-2'>
                                <Input name='categorie' value={categorie} onChange={(e) => setCategorie(e.target.value)} />
                                <Button className='bg-green-500 hover:bg-green-700 transition'>Sauvegarder</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    )
}

export default Parametres
