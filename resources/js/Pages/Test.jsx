import React from 'react';

export default function Test({ message }) {
    console.log('Test component rendered with message:', message);
    return (
        <div>
            <h1>Test Page</h1>
            <p>{message}</p>
        </div>
    );
}