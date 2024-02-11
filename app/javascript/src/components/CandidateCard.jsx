import React from 'react'

const CandidateCard = ({ candidate }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{candidate.name}</h5>
        <p className="card-text">{candidate.email}</p>
      </div>
    </div>
  )
}

export default CandidateCard
