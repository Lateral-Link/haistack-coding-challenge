import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Button from "../Common/Button";
import { TableRow, TableCell } from "../styles/Candidates/Candidate";
import { format } from "date-fns";
import Modal from "../Common/Modal";

const Candidate = ({ name, email, date_of_birth, id, onDelete }) => {
  const formattedDateOfBirth = format(
    new Date(date_of_birth.replace(/-/g, "/")),
    "yyyy/MM/dd"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    onDelete(id);
    closeModal();
  };

  return (
    <TableRow key={id}>
      <TableCell className="candidate-name">{name}</TableCell>
      <TableCell className="candidate-email">{email}</TableCell>
      <TableCell className="candidate-date-of-birth">
        {formattedDateOfBirth}
      </TableCell>
      <TableCell className="candidate-link">
        <Link to={`/candidates/${id}`}>View Candidate</Link>
        <Link to={`/candidates/${id}/update`}>Edit</Link>
        <Button
          className="delete-button action-button"
          onClick={openModal}
        >
          Delete
        </Button>

        {isModalOpen && (
          <Modal
            title="Confirm Deletion"
            message="Are you sure you want to delete this candidate?"
            onCancel={closeModal}
            onConfirm={confirmDelete}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default Candidate;
