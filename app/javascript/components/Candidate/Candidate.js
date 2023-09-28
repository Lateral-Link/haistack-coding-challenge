import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Wrapper, CandidateInfo, CandidateName, CandidateEmail, CandidateDOB} from "../styles/Candidate/Candidate";

const Candidate = (props) => {
  const [candidate, setCandidate] = useState({});

  useEffect(() =>{
    const id = props.match.params.id;
    const url = `/api/v1/candidates/${id}`;
    axios.get(url)
      .then(resp => setCandidate(resp.data))
      .catch(resp => console.log(resp));
  }, []);

  return (
    <Wrapper>
      <CandidateInfo>
        <CandidateName>{candidate.name}</CandidateName>
        <CandidateEmail>Email: {candidate.email}</CandidateEmail>
        <CandidateDOB>Date of Birth: {candidate.date_of_birth}</CandidateDOB>
      </CandidateInfo>
    </Wrapper>
  );
};

export default Candidate;
