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
        <div className="flex items-center justify-center">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {candidates.map((candidate) => (
                        <tr key={candidate.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{candidate.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{candidate.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{candidate.birth_date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => handleEdit(candidate.id)}
                                    className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow-sm mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(candidate.id)}
                                    className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow-sm "
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


};

export default CandidateList;
