import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function SalesReport({ auth, salesData }) {
    const data = {
        labels: salesData.map(entry => entry.date),
        datasets: [
            {
                label: 'Total Sales ($)',
                data: salesData.map(entry => entry.total),
                fill: false,
                borderColor: '#4F46E5',
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Sales Report',
            },
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sales Report</h2>}
        >
            <Head title="Sales Report" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}