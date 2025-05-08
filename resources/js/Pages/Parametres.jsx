import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { router, useForm, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

const Parametres = () => {

    const { user } = usePage().props.auth;
    const configuration = usePage().props.configuration

    //Les données personnnelles
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: ''
    })

    const [devise, setDevise] = useState(configuration[0].devise)
    const [theme, setTheme] = useState(configuration[0].theme)
    const [langue, setLangue] = useState(configuration[0].langue)
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

    const handleConfig = () =>
    {
        e.preventDefault();
        router.put(route('preferences'));
    }


    return (
        <AuthenticatedLayout>
            <section className="bg-white p-10 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">Paramètres</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informations personnelles */}
                    <div className="bg-gray-50 hover:shadow-lg transition rounded-xl p-6 border border-gray-200">
                        <form onSubmit={handleInfoUser} className="space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 mb-4">Informations Personnelles</legend>

                            <div>
                                <Label>Nom du Compte</Label>
                                <Input name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            </div>

                            <div>
                                <Label>Email</Label>
                                <Input name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            </div>

                            <div>
                                <Label>Mot de passe</Label>
                                <Input type="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                            </div>

                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow">Mettre à jour</Button>
                        </form>
                    </div>

                    {/* Préférences */}
                    <div className="bg-gray-50 hover:shadow-lg transition rounded-xl p-6 border border-gray-200">
                        <form onSubmit={handleConfig} className="space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 mb-4">Préférences</legend>

                            <div>
                                <Label>Devise</Label>
                                <select
                                    name="devise"
                                    value={devise}
                                    onChange={(e) => setDevise(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring focus:ring-indigo-200"
                                >
                                    <option value="fcfa">FCFA</option>
                                    <option value="euro">EURO</option>
                                    <option value="usd">USD</option>
                                </select>
                            </div>

                            <div>
                                <Label>Thème</Label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring focus:ring-indigo-200"
                                >
                                    <option value="">Clair</option>
                                    <option value="">Sombre</option>
                                </select>
                            </div>

                            <div>
                                <Label>Langue</Label>
                                <select
                                    value={langue}
                                    onChange={(e) => setLangue(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:ring focus:ring-indigo-200"
                                >
                                    <option value="">Français</option>
                                    <option value="">Anglais</option>
                                    <option value="">Espagnol</option>
                                </select>
                            </div>

                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">Enregistrer</Button>
                        </form>
                    </div>

                    {/* Ajouter une nouvelle catégorie */}
                    <div className="bg-gray-50 hover:shadow-lg transition rounded-xl p-6 border border-gray-200 md:col-span-2">
                        <form onSubmit={handleRegisterCategorie} className="space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 mb-2">Ajouter une nouvelle catégorie</legend>

                            <div className="flex flex-col md:flex-row gap-4">
                                <Input name="categorie" value={categorie} onChange={(e) => setCategorie(e.target.value)} className="flex-1" />
                                <Button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">Sauvegarder</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    )

}

export default Parametres
