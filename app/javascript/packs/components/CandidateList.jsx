import React, { useState } from 'react';

const CandidateList = ({ candidates, updateCandidate, deleteCandidate }) => {
    const [editingCandidateId, setEditingCandidateId] = useState(null);
    const [editedCandidates, setEditedCandidates] = useState({});

    const handleInputChange = (id, field, value) => {
        setEditedCandidates({
            ...editedCandidates,
            [id]: { ...editedCandidates[id], [field]: value },
        });
    };

    const handleEdit = (id) => {
        setEditingCandidateId(id);
        setEditedCandidates({ ...editedCandidates, [id]: candidates.find((c) => c.id === id) });
    };

    const handleDelete = (id) => {
        deleteCandidate(id);
    };

    const handleDateInputChange = (id, value) => {
        handleInputChange(id, 'birth_date', value);
    };

    return (
        <ul>
            {candidates.map((candidate) => (
                <li key={candidate.id}>
                    <span
                        contentEditable={editingCandidateId === candidate.id}
                        onBlur={(e) =>
                            handleInputChange(candidate.id, 'name', e.target.textContent)
                        }
                    >
                        {candidate.name}
                    </span>{' '}
                    |{' '}
                    <span
                        contentEditable={editingCandidateId === candidate.id}
                        onBlur={(e) =>
                            handleInputChange(candidate.id, 'email', e.target.textContent)
                        }
                    >
                        {candidate.email}
                    </span>{' '}
                    |{' '}
                    {editingCandidateId === candidate.id ? (
                        <input
                            type="date"
                            value={editedCandidates[candidate.id]?.birth_date || candidate.birth_date}
                            onChange={(e) => handleDateInputChange(candidate.id, e.target.value)}
                        />
                    ) : (
                        candidate.birth_date
                    )}
                    {editingCandidateId === candidate.id ? (
                        <button
                            onClick={() => {
                                updateCandidate(candidate.id, editedCandidates[candidate.id]);
                                setEditingCandidateId(null);
                            }}
                        >
                            Save
                        </button>
                    ) : (
                        <button onClick={() => handleEdit(candidate.id)}>Edit</button>
                    )}
                    <button onClick={() => handleDelete(candidate.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default CandidateList;
