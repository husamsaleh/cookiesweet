import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CreateExisting({ auth, customers, sweets }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        sweets: [],
        special_requests: '',
    });

    const [selectedSweets, setSelectedSweets] = useState([]);

    const handleSweetChange = (sweetId, quantity) => {
        const updatedSweets = [...selectedSweets];
        const index = updatedSweets.findIndex(s => s.id === sweetId);
        
        if (index !== -1) {
            if (quantity > 0) {
                updatedSweets[index].quantity = quantity;
            } else {
                updatedSweets.splice(index, 1);
            }
        } else if (quantity > 0) {
            updatedSweets.push({ id: sweetId, quantity: quantity });
        }

        setSelectedSweets(updatedSweets);
        setData('sweets', updatedSweets);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/orders'); // Updated to use hardcoded route
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Order with Existing Customer</h2>}
        >
            <Head title="Create Order with Existing Customer" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            {/* Customer selection */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer">
                                    Customer
                                </label>
                                <select
                                    id="customer"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.customer_id}
                                    onChange={(e) => setData('customer_id', e.target.value)}
                                >
                                    <option value="">Select a customer</option>
                                    {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                                    ))}
                                </select>
                                {errors.customer_id && <div className="text-red-500">{errors.customer_id}</div>}
                            </div>

                            {/* Sweets selection */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Sweets
                                </label>
                                {sweets.map(sweet => (
                                    <div key={sweet.id} className="flex items-center mb-2">
                                        <span className="w-1/2">{sweet.name}</span>
                                        <input
                                            type="number"
                                            min="0"
                                            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={selectedSweets.find(s => s.id === sweet.id)?.quantity || ''}
                                            onChange={(e) => handleSweetChange(sweet.id, parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                ))}
                                {errors.sweets && <div className="text-red-500">{errors.sweets}</div>}
                            </div>

                            {/* Special requests */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="special_requests">
                                    Special Requests
                                </label>
                                <textarea
                                    id="special_requests"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.special_requests}
                                    onChange={(e) => setData('special_requests', e.target.value)}
                                />
                            </div>

                            {errors.error && <div className="text-red-500 mb-4">{errors.error}</div>}

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Create Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}