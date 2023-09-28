import React from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Button from '../Common/Button'
import {TableRow, TableCell} from '../styles/Candidates/Candidate'

const Candidate = ({name, email, date_of_birth, id, onDelete}) => {

  return (
    <TableRow key={id}>
      <TableCell className='candidate-name'>{name}</TableCell>
      <TableCell className='candidate-email'>{email}</TableCell>
      <TableCell className='candidate-date-of-birth'>{date_of_birth}</TableCell>
      <TableCell className='candidate-link'>
        <Link to={`/candidates/${id}`} >View Candidate</Link>
        <Button className="delete-button action-button" onClick={() => onDelete(id)}>Delete</Button>
        <Link to={`/candidates/${id}/update`}>Edit</Link>
      </TableCell >
    </TableRow>
  )
}

export default Candidate