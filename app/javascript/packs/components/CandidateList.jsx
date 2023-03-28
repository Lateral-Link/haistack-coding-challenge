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
                                    <input
                                        type="text"
                                        value={editedCandidates[candidate.id]?.name || candidate.name}
                                        onChange={(e) => handleInputChange(candidate.id, 'name', e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, candidate.id)}
                                        className="px-4 py-2 mr-4 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm"
                                    />
                                ) : (
                                    candidate.name
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingCandidateId === candidate.id ? (
                                    <input
                                        type="email"
                                        value={editedCandidates[candidate.id]?.email || candidate.email}
                                        onChange={(e) => handleInputChange(candidate.id, 'email', e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, candidate.id)}
                                        className="px-4 py-2 mr-4 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm"
                                    />
                                ) : (
                                    candidate.email
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingCandidateId === candidate.id ? (
                                    <input
                                        type="date"
                                        value={editedCandidates[candidate.id]?.birth_date || candidate.birth_date}
                                        onChange={(e) => handleDateInputChange(candidate.id, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, candidate.id)}
                                        className="px-4 py-2 mr-4 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm"
                                    />
                                ) : (
                                    candidate.birth_date
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingCandidateId === candidate.id ? (
                                    <button
                                        onClick={() => handleSave(candidate.id)}
                                        className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow-sm mr-2"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(candidate.id)}
                                        className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow-sm mr-2"
                                    >
                                        Edit
                                    </button>
                                )}
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

