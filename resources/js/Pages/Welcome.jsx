import { Apropos } from '@/Components/Welcome/Apropos';
import { Fonctionnalites } from '@/Components/Welcome/Fonctionnalites';
import { Footer } from '@/Components/Welcome/Footer';
import { Hero } from '@/Components/Welcome/Hero';
import { Temoignages } from '@/Components/Welcome/Temoignages';
import { Head } from '@inertiajs/react';

export default function Welcome({ auth}) {

    return (
        <div>
            <Head title="Acceuil" />
            <Hero auth={auth}/>
            <Fonctionnalites/>
            <Apropos/>
            <Temoignages/>
            <Footer/>
        </div>
    );
}
