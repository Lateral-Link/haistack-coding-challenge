import React, {useState, useEffect } from "react";
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';

const CandidateNew = (props) => {
  const { id } = useParams();
  const [candidateForm, setCandidateForm] = useState({ name: '', email: '', date_of_birth: '' })

  const handleChange = (e) => {
    setCandidateForm({...candidateForm, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const confirmed = window.confirm('Are you sure you want to create this candidate?')
    if (confirmed){
      const { id, created_at, updated_at, ...candidateFormDataToSend } = candidateForm;
      const response = await axios.put(`/api/v1/candidates/${id}`, candidateFormDataToSend)
      console.log(candidateFormDataToSend)
      if (response.status === 200){
        props.history.push(`/`)
      }
    }
  
  }


  return (
    <div className='container'>
      <h2 className="form-title">Create Candidate</h2>
      <form className="update-form" onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
    )
}

export default CandidateNew