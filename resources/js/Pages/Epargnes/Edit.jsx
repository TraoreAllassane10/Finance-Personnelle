import { Card } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm, usePage } from '@inertiajs/react'

const Edit = () => {
    const { epargne } = usePage().props

    const { data, setData, put, processing, errors, reset } = useForm({
        date: epargne.date,
        montant: epargne.montant,
        compte: epargne.compte,
        projet: epargne.projets
    })

    const handleUpdate = (e) => {
        e.preventDefault();

        put(route("epargnes.update", epargne.id), {})
    }
    return (
        <AuthenticatedLayout>
            <Card className="flex flex-col justify-center relative top-24 w-1/2 mx-auto">
                <div className="flex flex-col gap-4 p-8">
                    <h3 className='text-xl text-center text-gray-800 font-semibold '>Modification d'un epargne</h3>
                    <hr className='text-center' />
                    <div>
                        <Label htmlFor="name" className="text-right">
                            Date
                        </Label>
                        <Input
                            type="date"
                            id="date"
                            value={data.date}
                            className="col-span-3"
                            onChange={(e) => setData('date', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="montant"
                            className="text-right"
                        >
                            Montant
                        </Label>
                        <Input
                            type="text"
                            id="montant"
                            value={data.montant}
                            className="col-span-3"
                            onChange={(e) => setData('montant', e.target.value)}
                        />
                    </div>


                    <div>
                        <Label
                            htmlFor="compte"
                            className="text-right"
                        >
                            Compte d'epargne
                        </Label>
                        <Input
                            type="text"
                            id="compte"
                            value={data.compte}
                            className="col-span-3"
                            onChange={(e) => setData('compte', e.target.value)}
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="projet"
                            className="text-right"
                        >
                            Projet
                        </Label>
                        <Textarea
                            id="projet"
                            value={data.projet}
                            className="col-span-3"
                            onChange={(e) => setData('projet', e.target.value)}
                        />
                    </div>

                    <button onClick={handleUpdate} className='p-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-700' disabled={processing}>
                        {processing ? "Modification..." : "Modifier"}
                    </button>
                </div>
            </Card>
        </AuthenticatedLayout>
    )
}

export default Edit
