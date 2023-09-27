import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";

const Candidates = () => {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    axios.get('/api/v1/candidates.json')
    .then(resp => {
      setCandidates(resp.data)
    })
    .catch(resp => console.log(resp))

  }, [candidates.length])

  const list = candidates.map(item => {
    return (<li key={item.name}>{item.name}</li>)
  })

  return (
  <Fragment>
  <div>This is the Candidates#index view for our app.</div>
  <ul>{list}</ul>
  </Fragment>
  )
}

export default Candidates