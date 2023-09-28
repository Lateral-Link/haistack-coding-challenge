import React from "react";
import {
  TableHeaderRow,
  TableCell,
  ClickableText,
} from "../styles/Candidates/TableHeader";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const Tableheader = ({ onSort, sort }) => {
  const isCurrentColumn = (columnName) => sort.column === columnName;
  const isAscending = sort.order === "asc";

  return (
    <TableHeaderRow>
      <TableCell
        onClick={() => onSort("name")}
        className={isCurrentColumn("name") ? `sorted-${sort.order}` : ""}
      >
        <ClickableText>Name</ClickableText>{" "}
        {isCurrentColumn("name") &&
          (isAscending ? <FaSortUp /> : <FaSortDown />)}
      </TableCell>
      <TableCell
        onClick={() => onSort("email")}
        className={isCurrentColumn("email") ? `sorted-${sort.order}` : ""}
      >
        <ClickableText>Email</ClickableText>{" "}
        {isCurrentColumn("email") &&
          (isAscending ? <FaSortUp /> : <FaSortDown />)}
      </TableCell>
      <TableCell
        onClick={() => onSort("date_of_birth")}
        className={
          isCurrentColumn("date_of_birth") ? `sorted-${sort.order}` : ""
        }
      >
        <ClickableText>Date of Birth</ClickableText>{" "}
        {isCurrentColumn("date_of_birth") &&
          (isAscending ? <FaSortUp /> : <FaSortDown />)}
      </TableCell>
      <TableCell>Actions</TableCell>
    </TableHeaderRow>
  );
};

export default Tableheader;
