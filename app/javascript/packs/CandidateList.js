import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/candidates.css';
import { Link } from 'react-router-dom';


const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get('/api/candidates')
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  const handleDeleteCandidate = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this candidate?");
    
    if (confirmed) {
      axios.delete(`http://127.0.0.1:3000/api/candidates/${id}`)
        .then(response => {
          if (response.status === 200) {
            // Refresh the candidate list after deletion
            axios.get('http://127.0.0.1:3000/api/candidates')
              .then(response => setCandidates(response.data))
              .catch(error => console.error('Error fetching candidates:', error));
          } else {
            console.error('Error deleting candidate:', response.statusText);
          }
        });
    }
  };

  return(
    <div className="container">
      <div className="candidate-list-container">
        <h2 className="candidate-list-title">Candidate List</h2>
        <div className="table-container">
        <Link to="/candidate/new" className="create-button">Create Candidate</Link>
          <div className="candidate-table">
            <div className="table-row table-header">
              <div className="table-cell">Name</div>
              <div className="table-cell">Email</div>
              <div className="table-cell">Actions</div>
            </div>
            {candidates.map(candidate => (
              <div key={candidate.id} className="table-row">
                <div className="table-cell">{candidate.name}</div>
                <div className="table-cell">{candidate.email}</div>
                <div className="table-cell">
                    <button className="action-button">Details</button>
                    <button className="action-button">Edit</button>
                  <button className="action-button" onClick={() => handleDeleteCandidate(candidate.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;