import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Wrapper, CandidateInfo, CandidateName, CandidateEmail, CandidateDOB} from "../styles/Candidate/Candidate";
import { format } from 'date-fns';

const Candidate = (props) => {
  const [candidate, setCandidate] = useState({});
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState('');

  useEffect(() =>{
    const id = props.match.params.id;
    const url = `/api/v1/candidates/${id}`;
    
    axios.get(url)
      .then(resp => {
        setCandidate(resp.data);
        const formattedDOB = format(new Date(resp.data.date_of_birth.replace(/-/g,'/')), 'dd/MM/yyyy');
        setFormattedDateOfBirth(formattedDOB);
      })
      .catch(resp => console.log(resp));
  }, [props.match.params.id]); 

  return (
    <Wrapper>
      <CandidateInfo>
        <CandidateName>{candidate.name}</CandidateName>
        <CandidateEmail>Email: {candidate.email}</CandidateEmail>
        <CandidateDOB>Date of Birth: {formattedDateOfBirth}</CandidateDOB>
      </CandidateInfo>
    </Wrapper>
  );
};

export default Candidate;
