import React from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';

const TableRow = styled.div `
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  
  &:nth-child(even) {
    background-color: #ededed; 
  }
`

const TableCell = styled.div `
  flex: 1;

  &.candidate-name{
    padding: 20px 0 10px 0;
  }

  &.candidate-email{
    padding: 20px 0 10px 0;
  }

  &.candidate-date-of-birth{
    padding: 20px 0 10px 0;
  }

  &.candidate-link{
    padding: 20px 0 10px 0;
    a {
      color: #fff;
      background-color: #000;
      border-radius: 8px;
      padding: 2px 0px 4px 0px;
      border: 1px solid #000;
      width: 100%;
      text-decoration: none;
    }
  }
`

const Candidate = ({name, email, date_of_birth, id, onDelete}) => {

  return (
    <TableRow key={id}>
      <TableCell className='candidate-name'>{name}</TableCell>
      <TableCell className='candidate-email'>{email}</TableCell>
      <TableCell className='candidate-date-of-birth'>{date_of_birth}</TableCell>
      <TableCell className='candidate-link'>
        <Link to={`/candidates/${id}`} >View Candidate</Link>
       <button className="delete-button action-button" onClick={() => onDelete(id)}>Delete</button>
        <Link to={`/candidates/${id}/update`}>Edit Button</Link>
      </TableCell >
    </TableRow>
  )
}

export default Candidate