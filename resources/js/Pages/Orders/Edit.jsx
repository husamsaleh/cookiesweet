import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, order }) {
    const { data, setData, put, processing, errors } = useForm({
        customer_id: order.customer_id,
        sweets: order.sweets.map(sweet => ({ id: sweet.id, quantity: sweet.pivot.quantity })),
        special_requests: order.special_requests,
        status: order.status, // Include status in form data
    });

    const [selectedSweets, setSelectedSweets] = useState(data.sweets);
    const [totalPrice, setTotalPrice] = useState(Number(order.total_amount) || 0);

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
            const sweetData = order.sweets.find(s => s.id === sweet.id);
            return total + (sweetData.price * sweet.quantity);
        }, 0);
        setTotalPrice(newTotalPrice);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/orders/${order.id}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Order</h2>}
        >
            <Head title="Edit Order" />
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
                                    <option value={order.customer.id}>{order.customer.name}</option>
                                </select>
                                {errors.customer_id && <div className="text-red-500">{errors.customer_id}</div>}
                            </div>

                            {/* Sweets selection */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Sweets
                                </label>
                                {order.sweets.map(sweet => (
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

                            {/* Order Status */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                    Order Status
                                </label>
                                <select
                                    id="status"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="working_on">Working On</option>
                                    <option value="ready_for_delivery">Ready for Delivery</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                                {errors.status && <div className="text-red-500">{errors.status}</div>}
                            </div>

                            {errors.error && <div className="text-red-500 mb-4">{errors.error}</div>}

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-default hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Update Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}