import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CandidateForm = ({ createCandidate }) => {
    const [newCandidate, setNewCandidate] = useState({
        name: '',
        email: '',
        birth_date: '',
    });

    const handleFormInputChange = (event) => {
        const { name, value } = event.target;
        setNewCandidate({ ...newCandidate, [name]: value });
    };

    const handleDateChange = (date) => {
        setNewCandidate({ ...newCandidate, birth_date: date });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createCandidate(newCandidate);
        setNewCandidate({ name: '', email: '', birth_date: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex items-center justify-center">
                <input
                    type="text"
                    name="name"
                    value={newCandidate.name}
                    onChange={handleFormInputChange}
                    placeholder="Candidate name"
                    className="px-4 py-2 mr-4 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={newCandidate.email}
                    onChange={handleFormInputChange}
                    placeholder="Candidate email"
                    className="px-4 py-2 mr-4 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm"
                    required
                />
                <div className="w-auto">
                    <ReactDatePicker
                        selected={newCandidate.birth_date}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Candidate birth date"
                        className="px-4 py-2 mr-4 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm w-auto"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow-sm "
                >
                    Create
                </button>
            </div>
        </form>
    );
};

export default CandidateForm;
