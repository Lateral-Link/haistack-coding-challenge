import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateManager = () => {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        const response = await axios.get('/api/v1/candidates');
        setCandidates(response.data);
    };

    const createCandidate = async (candidate) => {
        await axios.post('/api/v1/candidates', candidate);
        fetchCandidates();
    };

    const updateCandidate = async (id, candidate) => {
        await axios.put(`/api/v1/candidates/${id}`, candidate);
        fetchCandidates();
    };

    const deleteCandidate = async (id) => {
        await axios.delete(`/api/v1/candidates/${id}`);
        fetchCandidates();
    };

    const [newCandidate, setNewCandidate] = useState({
        name: '',
        email: '',
        birth_date: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleFormInputChange = (event) => {
        const { name, value } = event.target;
        setNewCandidate({ ...newCandidate, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            updateCandidate(selectedCandidate.id, newCandidate);
        } else {
            createCandidate(newCandidate);
        }
        setNewCandidate({ name: '' });
        setIsEditing(false);
    };

    const handleEdit = (id) => {
        setEditingCandidateId(id);
    };


    const handleDelete = (id) => {
        deleteCandidate(id);
    };

    const [editingCandidateId, setEditingCandidateId] = useState(null);

    const handleSave = async (id) => {
        const candidateToSave = candidates.find((candidate) => candidate.id === id);
        await updateCandidate(id, candidateToSave);
        setEditingCandidateId(null);
    };

    const handleDateInputChange = (id, value) => {
        setCandidates((prevCandidates) =>
            prevCandidates.map((candidate) =>
                candidate.id === id ? { ...candidate, birth_date: value } : candidate
            )
        );
    };

    return (
        <div>
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
                <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            </form>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate.id}>
                        <span
                            contentEditable={editingCandidateId === candidate.id}
                            onBlur={(e) => handleInputChange(candidate.id, "name", e.target.textContent)}
                        >
                            {candidate.name}
                        </span>{" "}
                        |{" "}
                        <span
                            contentEditable={editingCandidateId === candidate.id}
                            onBlur={(e) => handleInputChange(candidate.id, "email", e.target.textContent)}
                        >
                            {candidate.email}
                        </span>{" "}
                        |{" "}
                        {editingCandidateId === candidate.id ? (
                            <input
                                type="date"
                                value={candidate.birth_date}
                                onChange={(e) => handleDateInputChange(candidate.id, e.target.value)}
                            />
                        ) : (
                            candidate.birth_date
                        )}
                        {editingCandidateId === candidate.id ? (
                            <button onClick={() => handleSave(candidate.id)}>Save</button>
                        ) : (
                            <button onClick={() => handleEdit(candidate.id)}>Edit</button>
                        )}
                        <button onClick={() => handleDelete(candidate.id)}>Delete</button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default CandidateManager;
