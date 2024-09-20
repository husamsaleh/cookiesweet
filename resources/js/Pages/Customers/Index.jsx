import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, customers }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Customers</h2>}
        >
            <Head title="Manage Customers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link href={route('customers.create')} className="btn-primary mb-4">Create New Customer</Link>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {customers.data.map((customer) => (
                                        <tr key={customer.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={route('customers.edit', customer.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Link>
                                                <Link href={route('customers.show', customer.id)} className="text-indigo-600 hover:text-indigo-900">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Add pagination controls here if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}