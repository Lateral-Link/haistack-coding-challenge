import React, { useState, useEffect } from 'react';
import CandidatesTable from '../components/CandidateTable';
import axios from 'axios'; // Adicione esta linha


const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get('/api/candidates') // Use Axios para fazer a requisição
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  return <CandidatesTable candidates={candidates} />;
}

export default CandidateList;