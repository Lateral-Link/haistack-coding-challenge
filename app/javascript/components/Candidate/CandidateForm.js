import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";

const CandidateForm = (props) => {
  const { id } = useParams();
  const isUpdating = !isNaN(id)
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    date_of_birth: ""
  });

  useEffect(() => {
    if (isUpdating) {
      const url = `/api/v1/candidates/${id}`;
      const getCandidate = async () => {
        try {
          const response = await axios.get(url);
          setCandidateForm(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      getCandidate();
    }
  }, [id, isUpdating]);

  const handleChange = (e) => {
    setCandidateForm({ ...candidateForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      isUpdating
        ? "Are you sure you want to update this candidate?"
        : "Are you sure you want to create this candidate?"
    );

    if (confirmed) {
      try {
        const response = isUpdating
          ? await axios.put(`/api/v1/candidates/${id}`, candidateForm)
          : await axios.post(`/api/v1/candidates`, candidateForm);

        if (response.status === 200 || response.status === 201) {
          props.history.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="form-title">
        {isUpdating ? "Update Candidate" : "Create Candidate" }
      </h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={candidateForm.name}
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
            value={candidateForm.email}
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
            value={candidateForm.date_of_birth}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          {isUpdating ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
