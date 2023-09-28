import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../Common/Button";
import {
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormTitle,
  Alert,
} from "../styles/Candidate/CandidateForm";

const CandidateForm = (props) => {
  const { id } = useParams();
  const isUpdating = !isNaN(id);
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    date_of_birth: "",
  });

  const [hasChanges, setHasChanges] = useState(false);

  const [userExistsAlert, setUserExistsAlert] = useState(false);
  const [dateInvalidAlert, setDateInvalidAlert] = useState(false);
  const [underAgeInvalidAlert, setUnderAgeInvalidAlert] = useState(false);
  const [maxAgeInvalidAlert, setMaxAgeInvalidAlert] = useState(false);

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

  const handleErrors = (error) => {
    console.log(error.response);
    if (error.response && error.response.status === 422) {
      const errorData = error.response.data;
      console.log(errorData.error);
      console.log(errorData.error.includes("must be at least 16 years old"));
      if (
        errorData.error.some((message) =>
          message.includes("must be in the past")
        )
      ) {
        setDateInvalidAlert(true);
        setUnderAgeInvalidAlert(false);
      } else if (
        errorData.error.some((message) =>
          message.includes("must be at least 16 years old")
        )
      ) {
        setUnderAgeInvalidAlert(true);
        setDateInvalidAlert(false);
      } else if (
        errorData.error.some((message) =>
          message.includes("must be at most 70 years old")
        )
      ) {
        setMaxAgeInvalidAlert(true);
        setDateInvalidAlert(false);
      } else {
        setUserExistsAlert(true);
      }
    } else {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges) {
      props.history.push("/");
      return;
    }

    if (isUpdating) {
      const confirmed = window.confirm(
        "Are you sure you want to update this candidate?"
      );

      if (confirmed) {
        try {
          const response = await axios.put(
            `/api/v1/candidates/${id}`,
            candidateForm
          );

          if (response.status === 200 || response.status === 201) {
            props.history.push("/");
          }
        } catch (error) {
          handleErrors(error);
        }
      }
    } else {
      try {
        const response = await axios.post(`/api/v1/candidates`, candidateForm);

        if (response.status === 201) {
          props.history.push("/");
        }
      } catch (error) {
        handleErrors(error);
      }
    }
  };

  return (
    <Container>
      <FormTitle>
        {isUpdating ? "Update Candidate" : "Create Candidate"}
      </FormTitle>

      {userExistsAlert && <Alert>User already exists.</Alert>}
      {dateInvalidAlert && (
        <Alert>Invalid date of birth. Please select a date in the past.</Alert>
      )}
      {underAgeInvalidAlert && (
        <Alert>Candidate must be at least 16 years old.</Alert>
      )}
      {maxAgeInvalidAlert && (
        <Alert>Candidate must be at most 70 years old.</Alert>
      )}

      <Form className="update-form" onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">Name:</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            value={candidateForm.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            value={candidateForm.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="date_of_birth">Date of Birth:</FormLabel>
          <FormInput
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={candidateForm.date_of_birth}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">{isUpdating ? "Update" : "Create"}</Button>
      </Form>
    </Container>
  );
};

export default CandidateForm;
