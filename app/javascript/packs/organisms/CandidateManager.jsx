import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateForm from '../molecules/CandidateForm';
import CandidateList from '../molecules/CandidateList';
import { toast } from 'react-hot-toast';

const CandidateManager = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleError = (error, defaultMessage) => {
        const errorData = error.response?.data?.error;

        if (errorData) {
            const errorMessages = Array.isArray(errorData)
                ? errorData.map((item) => item)
                : Object.entries(errorData).map(([key, value]) => `${key}: ${value[0]}`);

            toast.error(errorMessages.join('\n'));
        } else {
            toast.error(defaultMessage);
        }
    };

    const fetchCandidates = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/v1/candidates');
            setCandidates(response.data);
            setLoading(false);
        } catch (error) {
            handleError(error, 'Failed to fetch candidates.');
            setLoading(false);
        }
    };

    const createCandidate = async (candidate) => {
        try {
            await axios.post('/api/v1/candidates', candidate);
            fetchCandidates();
            toast.success('Candidate created successfully!');
        } catch (error) {
            handleError(error, 'An error occurred while creating the candidate. Please try again later.');
        }
    };

    const updateCandidate = async (id, candidate) => {
        try {
            await axios.put(`/api/v1/candidates/${id}`, candidate);
            fetchCandidates();
            toast.success('Candidate updated successfully!');
        } catch (error) {
            handleError(error, 'An error occurred while updating the candidate. Please try again later.');
        }
    };

    const deleteCandidate = async (id) => {
        try {
            await axios.delete(`/api/v1/candidates/${id}`);
            fetchCandidates();
            toast.success('Candidate deleted successfully!');
        } catch (error) {
            handleError(error, 'Failed to delete candidate.');
        }
    };

    return (
        <div className="px-4 py-6">
            <CandidateForm
                createCandidate={createCandidate}
                updateCandidate={updateCandidate}
            />
            {loading ? (
                <div className="text-center text-xl">Loading candidates...</div>
            ) : (
                <CandidateList
                    candidates={candidates}
                    updateCandidate={updateCandidate}
                    deleteCandidate={deleteCandidate}
                />
            )}
        </div>
    );
};

export default CandidateManager;
