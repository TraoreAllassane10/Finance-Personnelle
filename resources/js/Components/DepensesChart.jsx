
import { usePage } from '@inertiajs/react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DepensesChart = () => {
    const { depensesChart } = usePage().props;

    if (!depensesChart || depensesChart.length === 0) {
        return <p className="text-center text-gray-500">Aucune donnée à afficher</p>;
    }

    const labels = depensesChart.map((r) => r.mois);
    const dataValues = depensesChart.map((r) => r.total);

    const data = {
        labels,
        datasets: [
            {
                label: 'Évolution des dépenses',
                data: dataValues,
                borderColor: 'rgb(232, 62, 62)', // Rouge pour différencier des revenus
                backgroundColor: 'rgba(232, 62, 62, 0.2)',
                fill: true,
                tension: 0.3, // Rend la courbe plus fluide
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Évolution des dépenses' },
        },
    };

    return <Line data={data} options={options} />;
};

export default DepensesChart;
