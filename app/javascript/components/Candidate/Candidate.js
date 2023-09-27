import React, {useState, useEffect } from "react";
import axios from 'axios';

const Candidate = (props) => {
  const [candidate, setCandidate] = useState({})
  
  useEffect(() =>{
    const id = props.match.params.id
    const url = `/api/v1/candidates/${id}`
    axios.get(url)
    .then( resp => setCandidate(resp.data))
    .catch( resp => console.log(resp) )
  },[])

  return (
    <div className="wrapper">
      <div>
        <h1>{candidate.name}</h1>
        <p>{candidate.email}</p>
        <p>{candidate.date_of_birth}</p>
      </div>
    </div>
  )
}

export default Candidate