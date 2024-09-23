import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, sweets }) {
    const { delete: destroy } = useForm();

    const deleteSweet = (id) => {
        if (confirm('Are you sure you want to delete this sweet?')) {
            destroy(`/sweets/${id}`, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Sweets</h2>}
        >
            <Head title="Manage Sweets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link href="/sweets/create" className="bg-default hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-4">Add New Sweet</Link>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sweets.data.map((sweet) => (
                                        <tr key={sweet.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{sweet.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{sweet.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${sweet.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{sweet.stock}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`/sweets/${sweet.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button onClick={() => deleteSweet(sweet.id)} className="text-red-600 hover:text-red-900">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}