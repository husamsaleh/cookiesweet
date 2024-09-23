import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CreateNew({ auth, sweets }) {
    const { data, setData, post, processing, errors } = useForm({
        new_customer: {
            name: '',
            email: '',
            phone: '', 
        },
        sweets: [],
        special_requests: '',
    });

    const [selectedSweets, setSelectedSweets] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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

        // Calculate total price
        const newTotalPrice = updatedSweets.reduce((total, sweet) => {
            const sweetData = sweets.find(s => s.id === sweet.id);
            return total + (sweetData.price * sweet.quantity);
        }, 0);
        setTotalPrice(newTotalPrice);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/orders');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Order with New Customer</h2>}
        >
            <Head title="Create Order with New Customer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new_customer_name">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    id="new_customer_name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.new_customer.name}
                                    onChange={(e) => setData('new_customer', { ...data.new_customer, name: e.target.value })}
                                />
                                {errors.new_customer && errors.new_customer.name && (
                                    <div className="text-red-500">{errors.new_customer.name}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new_customer_email">
                                    Customer Email
                                </label>
                                <input
                                    type="email"
                                    id="new_customer_email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.new_customer.email}
                                    onChange={(e) => setData('new_customer', { ...data.new_customer, email: e.target.value })}
                                />
                                {errors.new_customer && errors.new_customer.email && (
                                    <div className="text-red-500">{errors.new_customer.email}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new_customer_phone">
                                    Customer Phone
                                </label>
                                <input
                                    type="tel"
                                    id="new_customer_phone"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.new_customer.phone}
                                    onChange={(e) => setData('new_customer', { ...data.new_customer, phone: e.target.value })}
                                />
                                {errors.new_customer && errors.new_customer.phone && (
                                    <div className="text-red-500">{errors.new_customer.phone}</div>
                                )}
                            </div>

                            {/* Sweets selection */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Sweets
                                </label>
                                {sweets.map(sweet => (
                                    <div key={sweet.id} className="flex items-center mb-2">
                                        <span className="w-1/2">{sweet.name} - ${sweet.price}</span>
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

                            {/* Total price */}
                            <div className="mb-4">
                                <label className="block text-orange-500 text-sm font-bold mb-2">
                                    Total Price: ${totalPrice.toFixed(2)}
                                </label>
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
                                    className="bg-default hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                    disabled={processing}
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