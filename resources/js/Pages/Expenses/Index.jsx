import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, expenses }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Expenses</h2>}
        >
            <Head title="Manage Expenses" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <Link href="/expenses/create" className="bg-default hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-4">Add New Expense</Link>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th> {/* Changed from Amount to Price */}
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {expenses.map((expense) => (
                                    <tr key={expense.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{expense.item_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">${expense.price}</td> {/* Changed from Amount to Price */}
                                        <td className="px-6 py-4 whitespace-nowrap">{expense.purchase_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{expense.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={`/expenses/${expense.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button onClick={() => deleteExpense(expense.id)} className="text-red-600 hover:text-red-900">
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
        </AuthenticatedLayout>
    );
}