import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

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
                <Input
                    type="text"
                    name="name"
                    value={newCandidate.name}
                    onChange={handleFormInputChange}
                    placeholder="Candidate name"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    value={newCandidate.email}
                    onChange={handleFormInputChange}
                    placeholder="Candidate email"
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

                <Button type="submit">Create</Button>
            </div>
        </form>
    );
};

export default CandidateForm;