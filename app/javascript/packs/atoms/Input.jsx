import React from 'react';

const Input = ({ type, name, value, onChange, placeholder, onKeyDown, className }) => (
    <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={`px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm ${className}`}
    />
);

export default Input;