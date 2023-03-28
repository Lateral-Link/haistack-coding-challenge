import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-black text-center py-4 fixed bottom-0 w-full bg-gray-100">
            <p>Haystack &copy; {currentYear}</p>
        </footer>
    );
};

export default Footer;