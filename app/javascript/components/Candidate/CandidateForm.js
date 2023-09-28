import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import Button from '../Common/Button'; 

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const FormTitle = styled.h2`
  color: #333; /* Cor do título */
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: bold;
  color: #555; /* Cor das labels */
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Alert = styled.div`
  color: red;
  margin-bottom: 10px;
`;



const CandidateForm = (props) => {
  const { id } = useParams();
  const isUpdating = !isNaN(id)
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    date_of_birth: ""
  });

  const [hasChanges, setHasChanges] = useState(false);

  const [userExistsAlert, setUserExistsAlert] = useState(false);

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
    setHasChanges(true); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!hasChanges) {
      props.history.push("/");
      return;
    }
  
    if (isUpdating) {
      const confirmed = window.confirm("Are you sure you want to update this candidate?");
  
      if (confirmed) {
        try {
          const response = await axios.put(`/api/v1/candidates/${id}`, candidateForm);
  
          if (response.status === 200 || response.status === 201) {
            props.history.push("/");
          }
        } catch (error) {
          if (error.response && error.response.status === 422) {
            setUserExistsAlert(true);
          } else {
            console.error(error);
          }
        }
      }
    } else {
      try {
        const response = await axios.post(`/api/v1/candidates`, candidateForm);
  
        if (response.status === 201) {
          props.history.push("/");
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          setUserExistsAlert(true);
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <Container>
      <FormTitle>
        {isUpdating ? "Update Candidate" : "Create Candidate" }
      </FormTitle>

      { userExistsAlert && <Alert>User already exists.</Alert>}

      <Form className="update-form" onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">
            Name:
          </FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            value={candidateForm.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="email">
            Email:
          </FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            value={candidateForm.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="date_of_birth">
            Date of Birth:
          </FormLabel>
          <FormInput
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={candidateForm.date_of_birth}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">
          {isUpdating ? "Update" : "Create"}
        </Button>
      </Form>
    </Container>
  );
};

export default CandidateForm;
