import React from 'react';

const Button = ({ children, className, onClick, type = 'button' }) => (
    <button
        type={type}
        onClick={onClick}
        className={`bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow-sm ${className}`}
    >
        {children}
    </button>
);

export default Button;
