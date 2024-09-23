import React from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth, canLogin, canRegister }) {
    console.log('Welcome component props:', { auth, canLogin, canRegister });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <ApplicationLogo />
            <h1 className="mt-6 text-4xl font-bold text-gray-800">Welcome to Husam Shop!</h1>
            <p className="mt-4 text-lg text-gray-600 text-center">Manage orders, customers, and inventory with ease.</p>
            <div className="mt-8">
                {auth && !auth.user ? (
                    <>
                        {canLogin && (
                            <Link href="/login" className="mr-4 px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                                Login
                            </Link>
                        )}
                        {canRegister && (
                            <Link href="/register" className="px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                                Register
                            </Link>
                        )}
                    </>
                ) : auth && auth.user ? (
                    <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Go to Dashboard
                    </Link>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
