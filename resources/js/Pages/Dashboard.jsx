import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Admin Functions</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href={route('sweets.index')} className="text-blue-600 hover:underline">
                                        Manage Sweets
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('orders.index')} className="text-blue-600 hover:underline">
                                        Manage Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('customers.index')} className="text-blue-600 hover:underline">
                                        Manage Customers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
