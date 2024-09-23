import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'background': {
                    DEFAULT: '#F97316', // This is the hex value for bg-orange-500
                },
            },
            borderColor: {
                DEFAULT: '#F97316', // This is the hex value for border-orange-500
            },
        },
    },

    plugins: [forms],
};
