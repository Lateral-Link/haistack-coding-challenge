import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";

const CandidateList = ({ candidates, updateCandidate, deleteCandidate }) => {
    const [editingCandidateId, setEditingCandidateId] = useState(null);
    const [editedCandidates, setEditedCandidates] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [filterText, setFilterText] = useState('');

    const handleInputChange = (candidateId, fieldName, fieldValue) => {
        setEditedCandidates({
            ...editedCandidates,
            [candidateId]: { ...editedCandidates[candidateId], [fieldName]: fieldValue },
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
        } else if (event.key === 'Escape') {
            setEditingCandidateId(null);
        }
    };
    const adjustDateForTimezone = (date) => {
        const adjustedDate = new Date(date);
        const offset = adjustedDate.getTimezoneOffset();
        adjustedDate.setMinutes(adjustedDate.getMinutes() + offset);
        return adjustedDate;
    };


    const requestSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    const filterData = (data, filter) => {
        if (!filter) {
            return data;
        }

        const filterLowerCase = filter.toLowerCase();

        return data.filter((candidate) =>
            candidate.name.toLowerCase().includes(filterLowerCase) ||
            candidate.email.toLowerCase().includes(filterLowerCase) ||
            candidate.birth_date.toLowerCase().includes(filterLowerCase)
        );
    };

    // Logic for sorting
    const sortData = (data, config) => {
        if (config.key === null) {
            return data;
        }

        const sortedData = [...data].sort((a, b) => {
            if (a[config.key] < b[config.key]) {
                return config.direction === 'asc' ? -1 : 1;
            }
            if (a[config.key] > b[config.key]) {
                return config.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sortedData;
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <Input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                icon="fas fa-search"
            />
            {candidates.length > 0 ? (
                <table className="min-w-full text-center divide-y divide-gray-200 mb-2">
                    <thead>
                        <tr>
                            <th
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('name')}
                            >
                                Name
                            </th>
                            <th
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('email')}
                            >
                                Email
                            </th>
                            <th
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('birth_date')}
                            >
                                Birth Date
                            </th>

                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-center divide-y divide-gray-200">
                        {sortData(filterData(candidates, filterText), sortConfig).map(({ id, name, email, birth_date }) => (
                            <tr key={id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingCandidateId === id ? (
                                        <Input
                                            type="text"
                                            value={editedCandidates[id]?.name || name}
                                            onChange={(e) => handleInputChange(id, 'name', e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, id)}
                                        />
                                    ) : (
                                        name
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingCandidateId === id ? (
                                        <Input
                                            type="email"
                                            value={editedCandidates[id]?.email || email}
                                            onChange={(e) => handleInputChange(id, 'email', e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, id)}
                                        />
                                    ) : (
                                        email
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingCandidateId === id ? (
                                        < DatePicker
                                            selected={adjustDateForTimezone(editedCandidates[id]?.birth_date || birth_date)}
                                            onChange={(date) => handleDateInputChange(id, date)}
                                            onKeyDown={(e) => handleKeyDown(e, id)}
                                            dateFormat="yyyy-MM-dd"
                                            className="px-4 py-2 bg-gray-100 text-center rounded-md focus:outline-none focus:bg-white focus:shadow-sm mr-4"
                                            customInput={
                                                <InputMask
                                                    mask="9999-99-99"
                                                    className="px-4 py-2 text-center bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:shadow-sm mr-4"
                                                />}
                                            required
                                        />
                                    ) : (
                                        birth_date
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingCandidateId === id ? (
                                        <Button
                                            onClick={() => handleSave(id)}
                                            className="mr-2"
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleEdit(id)}
                                            className="mr-2"
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => handleDelete(id)}
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
