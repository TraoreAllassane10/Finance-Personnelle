//

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

const RevenusChart = () => {
    const { revenusChart } = usePage().props;

    if (!revenusChart || revenusChart.length === 0) {
        return <p className="text-center text-gray-500">Aucune donnée à afficher</p>;
    }

    const labels = revenusChart.map((r) => r.mois);
    const dataValues = revenusChart.map((v) => v.total);

    const data = {
        labels,
        datasets: [
            {
                label: 'Évolution des revenus',
                data: dataValues,
                borderColor: 'rgb(15, 157, 232)',
                backgroundColor: 'rgba(15, 157, 232, 0.2)',
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Évolution des Revenus' },
        },
    };

    return <Line data={data} options={options} />;
};

export default RevenusChart;
