import React from "react";
import styled from 'styled-components'

const TableHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  font-weight: bold;
  `

const TableCell = styled.div`
  flex: 1;
`  

const Tableheader = () => {
  return (
    <TableHeaderRow>
      <TableCell>Name</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Date of Birth</TableCell>
      <TableCell>Actions</TableCell >
    </TableHeaderRow>
  )
}

export default Tableheader