import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, customer }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customer Details</h2>}
        >
            <Head title={`Customer: ${customer.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                            <p><strong>Name:</strong> {customer.name}</p>
                            <p><strong>Email:</strong> {customer.email}</p>
                            <p><strong>Phone:</strong> {customer.phone}</p>
                            <p><strong>Preferences:</strong> {customer.preferences}</p>

                            <h3 className="text-lg font-semibold mt-8 mb-4">Order History</h3>
                            {customer.orders.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {customer.orders.map((order) => (
                                            <tr key={order.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{new Date(order.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">${order.total_amount}</td>
                                                <td className="px-6 py-4">
                                                    <ul>
                                                        {order.sweets.map((sweet) => (
                                                            <li key={sweet.id}>
                                                                {sweet.name} (Quantity: {sweet.pivot.quantity})
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No orders found for this customer.</p>
                            )}

                            <div className="mt-6">
                                <Link
                                    href={`/customers/${customer.id}/edit`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Edit Customer
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}