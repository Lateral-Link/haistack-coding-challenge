import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';

const CandidateManager = () => {
    const [candidates, setCandidates] = useState([]);

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

    return (
        <div className="px-4 py-6">
            <h1 className="text-3xl text-center font-semibold mb-6">Candidate Manager</h1>
            <CandidateForm
                createCandidate={createCandidate}
                updateCandidate={updateCandidate}
            />
            <CandidateList
                candidates={candidates}
                updateCandidate={updateCandidate}
                deleteCandidate={deleteCandidate}
            />
        </div>
    );
};

export default CandidateManager;