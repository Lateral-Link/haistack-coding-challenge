import React, { useState, useEffect } from "react";
import { TableRow, TableCell } from "../styles/Candidates/Candidate";
import { format } from "date-fns";
import Modal from "../Common/Modal";
import Dropdown from "react-dropdown-select";
import { toast } from "react-toastify";

const Candidate = ({ name, email, date_of_birth, id, onDelete }) => {
  const formattedDateOfBirth = format(
    new Date(date_of_birth.replace(/-/g, "/")),
    "yyyy/MM/dd"
  );

  const options = [
    { label: "View", value: "view" },
    { label: "Edit", value: "edit" },
    { label: "Delete", value: "delete" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!isModalOpen) {
      setKey(prevKey => prevKey + 1);
    }
  }, [isModalOpen]);

  const handleChange = (values) => {
    if (values[0].value === "delete") {
      setIsModalOpen(true);
    } else if (values[0].value === "edit") {
      window.location.href = `/candidates/${id}/update`;
    } else if (values[0].value === "view") {
      window.location.href = `/candidates/${id}`;
    }
  };

  const confirmDelete = () => {
    onDelete(id);
    setIsModalOpen(false);
    toast.success("Candidate deleted successfully!");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <TableRow key={id}>
      <TableCell className="candidate-name">{name}</TableCell>
      <TableCell className="candidate-email">{email}</TableCell>
      <TableCell className="candidate-date-of-birth">
        {formattedDateOfBirth}
      </TableCell>
      <TableCell className="candidate-link">
        <Dropdown
          key={key}
          options={options}
          onChange={(values) => handleChange(values)}
          dropdownGap={5}
          dropdownPosition="bottom"
          placeholder="Actions"
          inputProps={{ style: { textAlign: "center" } }}
          style={{ marginLeft: "70%" }}
        />
        {isModalOpen && (
          <Modal
            title="Confirm Deletion"
            message="Are you sure you want to delete this candidate?"
            onCancel={handleCancel}
            onConfirm={confirmDelete}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default Candidate;
