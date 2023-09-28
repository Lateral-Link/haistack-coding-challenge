import React from "react";
import { TableHeaderRow, TableCell } from "../styles/Candidates/TableHeader";

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