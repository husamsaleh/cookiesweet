import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth, customers, sweets }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        sweets: [],
        special_requests: '',
    });

    const addSweet = () => {
        setData('sweets', [...data.sweets, { id: '', quantity: 1 }]);
    };

    const updateSweet = (index, field, value) => {
        const updatedSweets = [...data.sweets];
        updatedSweets[index][field] = value;
        setData('sweets', updatedSweets);
    };

    const removeSweet = (index) => {
        const updatedSweets = data.sweets.filter((_, i) => i !== index);
        setData('sweets', updatedSweets);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Order</h2>}
        >
            <Head title="Create Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">Customer</label>
                                    <select
                                        id="customer_id"
                                        value={data.customer_id}
                                        onChange={(e) => setData('customer_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Select a customer</option>
                                        {customers.map((customer) => (
                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                        ))}
                                    </select>
                                    {errors.customer_id && <div className="text-red-500 mt-2">{errors.customer_id}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Sweets</label>
                                    {data.sweets.map((sweet, index) => (
                                        <div key={index} className="flex items-center space-x-2 mt-2">
                                            <select
                                                value={sweet.id}
                                                onChange={(e) => updateSweet(index, 'id', e.target.value)}
                                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            >
                                                <option value="">Select a sweet</option>
                                                {sweets.map((s) => (
                                                    <option key={s.id} value={s.id}>{s.name}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={sweet.quantity}
                                                onChange={(e) => updateSweet(index, 'quantity', e.target.value)}
                                                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                min="1"
                                            />
                                            <button type="button" onClick={() => removeSweet(index)} className="text-red-600">Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addSweet} className="mt-2 text-indigo-600">Add Sweet</button>
                                    {errors.sweets && <div className="text-red-500 mt-2">{errors.sweets}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700">Special Requests</label>
                                    <textarea
                                        id="special_requests"
                                        value={data.special_requests}
                                        onChange={(e) => setData('special_requests', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    ></textarea>
                                    {errors.special_requests && <div className="text-red-500 mt-2">{errors.special_requests}</div>}
                                </div>

                                <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                                    Create Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}