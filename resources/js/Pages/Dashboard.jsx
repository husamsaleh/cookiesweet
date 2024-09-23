import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, totalSales, pendingOrders, lowStockSweets, totalCustomers }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-white shadow rounded border-default">
                                <h3 className="text-lg font-semibold">Total Sales</h3>
                                <p className="text-xl">${totalSales}</p>
                            </div>
                            <div className="p-4 bg-white shadow rounded border-default">
                                <h3 className="text-lg font-semibold">Pending Orders</h3>
                                <p className="text-xl">{pendingOrders}</p>
                            </div>
                            <div className="p-4 bg-white shadow rounded border-default">
                                <h3 className="text-lg font-semibold">Total Customers</h3>
                                <p className="text-xl">{totalCustomers}</p>
                            </div>
                            <div className="p-4 bg-white shadow rounded border-default">
                                <h3 className="text-lg font-semibold text-red-600">Low Stock Alerts</h3>
                                {lowStockSweets.length > 0 ? (
                                    <ul>
                                        {lowStockSweets.map(sweet => (
                                            <li key={sweet.id} className="text-red-500">
                                                {sweet.name} - {sweet.stock} left
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-green-500">All stocks are sufficient.</p>
                                )}
                            </div>
                        </div>

                        {/* Additional Dashboard Content */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-default">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-lg font-semibold mb-4">Admin Functions</h3>
                                <ul className="space-y-2">
                                    <li className="mb-2">
                                        <Link href="/sweets" className="text-white bg-orange-500 hover:bg-orange-700 font-bold py-2 px-4 rounded block">
                                            Manage Sweets
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link href="/orders" className="text-white bg-orange-500 hover:bg-orange-700 font-bold py-2 px-4 rounded block">
                                            Manage Orders
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link href="/customers" className="text-white bg-orange-500 hover:bg-orange-700 font-bold py-2 px-4 rounded block">
                                            Manage Customers
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
