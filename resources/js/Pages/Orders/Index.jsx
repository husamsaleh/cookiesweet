import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, orders, filter, statusFilter }) {
    const [currentFilter, setCurrentFilter] = useState(filter || 'all');
    const [currentStatusFilter, setCurrentStatusFilter] = useState(statusFilter || 'all');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        console.log('Current filter:', currentFilter);
        console.log('Current status filter:', currentStatusFilter);
        console.log('Orders:', orders);
    }, [currentFilter, currentStatusFilter, orders]);

    const handleFilterChange = (newFilter, type) => {
        setProcessing(true);
        if (type === 'date') {
            setCurrentFilter(newFilter);
        } else if (type === 'status') {
            setCurrentStatusFilter(newFilter);
        }
        router.get('/orders', { 
            filter: type === 'date' ? newFilter : currentFilter, 
            statusFilter: type === 'status' ? newFilter : currentStatusFilter 
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    };

    const handleEditOrder = (orderId) => {
        router.visit(`/orders/${orderId}/edit`);
    };

    const deleteOrder = (orderId) => {
        if (confirm('Are you sure you want to delete this order?')) {
            router.delete(`/orders/${orderId}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* New Order Creation Options */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4">Create New Order</h3>
                                <div className="space-x-4">
                                    <Link
                                        href="/orders/create"
                                        className="bg-default hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Create New Order
                                    </Link>
                                </div>
                            </div>

                            {/* Date Filter buttons */}
                            <div className="mb-4">
                                <h4 className="text-md font-semibold mb-2">Filter by Date:</h4>
                                <div className="space-x-2">
                                    {['all', 'today', 'this_week', 'this_month'].map((filterOption) => (
                                        <button
                                            key={filterOption}
                                            onClick={() => handleFilterChange(filterOption, 'date')}
                                            className={`px-4 py-2 rounded ${currentFilter === filterOption ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                                            disabled={processing}
                                        >
                                            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Status Filter buttons */}
                            <div className="mb-4">
                                <h4 className="text-md font-semibold mb-2">Filter by Status:</h4>
                                <div className="space-x-2">
                                    {['all', 'pending', 'working_on', 'ready_for_delivery', 'delivered'].map((statusOption) => (
                                        <button
                                            key={statusOption}
                                            onClick={() => handleFilterChange(statusOption, 'status')}
                                            className={`px-4 py-2 rounded ${currentStatusFilter === statusOption ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                                            disabled={processing}
                                        >
                                            {statusOption.charAt(0).toUpperCase() + statusOption.slice(1).replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-4">Order List</h3>
                            {orders.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{order.customer.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">${order.total_amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(order.created_at).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button onClick={() => handleEditOrder(order.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button onClick={() => deleteOrder(order.id)} className="text-red-600 hover:text-red-900">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No orders found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}