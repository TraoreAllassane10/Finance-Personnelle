import { usePage } from '@inertiajs/react'
import { CategoryScale, Chart as chartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js';
import React from 'react'
import { Line } from 'react-chartjs-2';

chartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const DepensesChart = () => {

    const {depensesChart} = usePage().props;

    if(!depensesChart || depensesChart.length === 0)
    {
        return (<p>Aucune donnée à afficher</p>)
    }

    const labels = depensesChart.map(r => r.mois);
    const dataValues = depensesChart.map(r => r.total);

    const data = {
        labels,
        datasets: [
            {
                label: "Evolution des dépenses",
                data: dataValues,
                borderColor: "rbg(15, 157, 232)",
                backgroundColor: "rbg(75,192,192,0.2)"
            }
        ]
    }

    const options = {
        reponsive: true,
        plugins: {
            legend: {position: 'top'},
            title: {display:true, text: 'Evolution des dépenses'}
        }
    }

  return <Line data={data} options={options}/>
}

export default DepensesChart
