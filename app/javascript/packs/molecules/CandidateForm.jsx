import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";

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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        } else if (event.key === 'Escape') {
            setNewCandidate({ name: '', email: '', birth_date: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex items-center justify-center">
                <Input
                    type="text"
                    name="name"
                    value={newCandidate.name}
                    onChange={handleFormInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Candidate name"
                    className="mr-4"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    value={newCandidate.email}
                    onChange={handleFormInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Candidate email"
                    className="mr-4"
                    required
                />
                <div className="w-auto">
                    <DatePicker
                        selected={newCandidate.birth_date}
                        onChange={handleDateChange}
                        onKeyDown={handleKeyDown}
                        placeholderText="yyyy-MM-dd"
                        className="px-4 py-2 text-center bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm mr-4"
                        customInput={
                            <InputMask
                                mask="9999-99-99"
                                className="px-4 py-2 text-center bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm mr-4"
                            />}
                        required
                    />
                </div>

                <Button type="submit">Create</Button>
            </div>
        </form>
    );
};

export default CandidateForm;
