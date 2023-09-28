import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Candidate from './Candidate';
import Tableheader from "./TableHeader";
import styled from 'styled-components'

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  `
const Header = styled.div`
  padding: 100px 100px 10px 100px;
  h1 {
    font-size: 42px;
  }
`
const Subheader = styled.div`
  font-weight: 300;
  font-size: 26px;
`
const CreateCandidateLink = styled(Link)`
  display: block;
  margin-top: 20px;
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  background-color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #000;

  &:hover {
    background-color: #333;
  }
`;

const Candidates = () => {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    axios.get('/api/v1/candidates.json')
    .then(resp => {
      setCandidates(resp.data)
    })
    .catch(resp => console.log(resp))

  }, [candidates.length])

  const handleDeleteCandidate = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this candidate?");
    const url = `/api/v1/candidates/${id}`;
    if (confirmed) {
      axios.delete(url)
        .then(response => {
          if (response.status === 204) {
            console.log('Candidate deleted successfully');
            setCandidates(prevCandidates => prevCandidates.filter(candidate => candidate.id !== id)); // Atualiza a lista removendo o candidato excluído
          } else {
            console.error('Error deleting candidate:', response.statusText);
          }
        });
    }
  }

  const table = candidates.map(item => {
    return (
      <Candidate 
      name={item.name}
      email={item.email}
      date_of_birth={item.date_of_birth}
      id={item.id}
      onDelete={handleDeleteCandidate}
      />
    )
  })

  return (
  <Home>
    <Header>
      <h1>Candidates Manager</h1>
      <Subheader>Candidates List</Subheader>
    </Header>
    <CreateCandidateLink to={`/candidate/new`} >Create candidate</CreateCandidateLink>
    <Tableheader/>
      {table}
  </Home>
  )
}

export default Candidates