import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const CandidateInfo = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
  text-align: left;
`;

const CandidateName = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const CandidateEmail = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

const CandidateDOB = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

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
