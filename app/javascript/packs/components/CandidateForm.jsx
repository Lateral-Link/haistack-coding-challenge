import React, { useState } from 'react';

const CandidateForm = ({ createCandidate, updateCandidate }) => {
    const [newCandidate, setNewCandidate] = useState({
        name: '',
        email: '',
        birth_date: '',
    });

    const handleFormInputChange = (event) => {
        const { name, value } = event.target;
        setNewCandidate({ ...newCandidate, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createCandidate(newCandidate);
        setNewCandidate({ name: '', email: '', birth_date: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={newCandidate.name}
                onChange={handleFormInputChange}
                placeholder="Candidate name"
            />
            <input
                type="email"
                name="email"
                value={newCandidate.email}
                onChange={handleFormInputChange}
                placeholder="Candidate email"
            />
            <input
                type="date"
                name="birth_date"
                value={newCandidate.birth_date}
                onChange={handleFormInputChange}
                placeholder="Candidate birth date"
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default CandidateForm;
