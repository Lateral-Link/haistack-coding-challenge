import React from 'react';
import '../stylesheets/candidates.css';

const CandidatesTable = ({ candidates }) => {
  return (
    
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-8">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(candidate => (
                <tr key={candidate.id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.date_of_birth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidatesTable;
