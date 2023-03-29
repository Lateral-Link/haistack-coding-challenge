import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

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

    const handleSave = (id) => {
        updateCandidate(id, editedCandidates[id]);
        setEditingCandidateId(null);
    };

    const handleKeyDown = (event, id) => {
        if (event.key === 'Enter') {
            handleSave(id);
        }
    };

    return (
        <div className="flex items-center justify-center">
            {candidates.length > 0 ? (
                <table className="min-w-full text-center divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Date</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-center divide-y divide-gray-200">
                        {candidates.map((candidate) => (
                            <tr key={candidate.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingCandidateId === candidate.id ? (
                                        <Input
                                            type="text"
                                            value={editedCandidates[candidate.id]?.name || candidate.name}
                                            onChange={(e) => handleInputChange(candidate.id, 'name', e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, candidate.id)}
                                        />
                                    ) : (
                                        candidate.name
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingCandidateId === candidate.id ? (
                                        <Input
                                            type="email"
                                            value={editedCandidates[candidate.id]?.email || candidate.email}
                                            onChange={(e) => handleInputChange(candidate.id, 'email', e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, candidate.id)}
                                        />
                                    ) : (
                                        candidate.email
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingCandidateId === candidate.id ? (
                                        <Input
                                            type="date"
                                            value={editedCandidates[candidate.id]?.birth_date || candidate.birth_date}
                                            onChange={(e) => handleDateInputChange(candidate.id, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, candidate.id)}
                                        />
                                    ) : (
                                        candidate.birth_date
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingCandidateId === candidate.id ? (
                                        <Button
                                            onClick={() => handleSave(candidate.id)}
                                            className="mr-2"
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleEdit(candidate.id)}
                                            className="mr-2"
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => handleDelete(candidate.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>) : (
                <h2 className="text-2xl h-full text-gray-700">No Candidates registered</h2>
            )}
        </div>
    );
};

export default CandidateList;
