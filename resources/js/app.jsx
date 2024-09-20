import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        console.log('Resolving page:', name);
        const page = resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));
        console.log('Resolved page:', page);
        return page;
    },
    setup({ el, App, props }) {
        console.log('Setting up app with props:', props);
        console.log('Rendering into element:', el);
        const root = createRoot(el);
        root.render(
            <React.StrictMode>
                <App {...props} />
            </React.StrictMode>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
