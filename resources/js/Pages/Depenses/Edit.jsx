import { Card } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm, usePage } from '@inertiajs/react'

const Edit = () => {

    const depense = usePage().props.depense
    const categories = usePage().props.categories

    const { data, setData, put, processing, errors, reset } = useForm({
        date: depense.date,
        montant: depense.montant,
        category_id: depense.category_id,
        description: depense.description
    })

    const handleUpdate = (e) => {
        e.preventDefault();

        put(route("depenses.update", depense.id), {})
    }

    return (
        <AuthenticatedLayout>
            <Card className="flex flex-col justify-center relative top-24 w-1/2 mx-auto">
                <div className="flex flex-col gap-4 p-8">
                    <h3 className='text-xl text-center text-gray-800 font-semibold '>Modification d'une depense</h3>
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
                        <label htmlFor="categorie" className="block text-sm font-medium text-gray-900">
                            Catégorie
                        </label>
                        <select
                            id="categorie"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Choisissez une categorie</option>
                            {categories.map((categorie) => (
                                <option key={categorie.id} value={categorie.id}>
                                    {categorie.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <Label
                            htmlFor="username"
                            className="text-right"
                        >
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            className="col-span-3"
                            onChange={(e) => setData('description', e.target.value)}
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
