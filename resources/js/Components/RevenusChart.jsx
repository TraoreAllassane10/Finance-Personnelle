import { usePage } from '@inertiajs/react'
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react'
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const RevenusChart = () => {

    const { revenusChart } = usePage().props

    if(!revenusChart || revenusChart.length === 0)
    {
        return (<p>Aucune donnée à afficher</p>)
    }

    const labels = revenusChart.map(r => r.mois);
    const dataValues = revenusChart.map(v => v.total);

    const data = {
        labels,
        datasets: [
            {
                label: "Evolutions des revénus",
                data: dataValues,
                borderColor: "rbg(75,192,192)",
                backgroundColor: "rbg(75,192,192,0.2)"
            }
        ]
    }

    const options = {
        reponsive: true,
        plugins: {
            legend: {position: 'top'},
            title: {display: true, text: "Evolution des Revenus"}
        }
    }

    return <Line data={data} options={options}/>
}

export default RevenusChart
