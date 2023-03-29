import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

const Input = ({ type, name, value, onChange, placeholder, onKeyDown, className, icon }) => (
    <div className="relative">
        {icon && (
            <i className={`absolute top-0 left-0 mt-3 ml-3 text-gray-500 ${icon}`}></i>
        )}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            className={`px-4 py-2 pl-10 bg-gray-100 text-center rounded-md focus:outline-none focus:bg-white focus:shadow-sm ${className}`}
            id={name}
            style={{ paddingLeft: "2rem" }}
        />
    </div>
);



export default Input;