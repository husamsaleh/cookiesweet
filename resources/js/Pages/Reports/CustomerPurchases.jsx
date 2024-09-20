import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CustomerPurchasesReport({ auth, customerPurchases }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customer Purchase History</h2>}
        >
            <Head title="Customer Purchase History" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Customer Purchase Histories</h3>
                        {customerPurchases.map(customer => (
                            <div key={customer.id} className="mb-6">
                                <h4 className="text-md font-semibold">{customer.name} ({customer.email})</h4>
                                {customer.orders.length > 0 ? (
                                    <ul className="list-disc list-inside mt-2">
                                        {customer.orders.map(order => (
                                            <li key={order.id} className="mb-2">
                                                <span className="font-medium">Order #{order.id}</span> - ${order.total_amount} - {order.status.replace('_', ' ')}
                                                <ul className="list-disc list-inside ml-5 mt-1">
                                                    {order.sweets.map(sweet => (
                                                        <li key={sweet.id}>
                                                            {sweet.name} x {sweet.pivot.quantity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No orders found for this customer.</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}